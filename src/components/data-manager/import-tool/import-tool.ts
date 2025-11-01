import { TemplateResult, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { translate } from '@/lib/Localization';
import JSZip from 'jszip';
import { repeat } from 'lit/directives/repeat.js';
import { ImportResultType } from './import-tool.models';
import { ExportDataContents } from 'api-spec/models/Data';
import { storage } from '@/lib/Storage';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

@customElement('import-tool')
export class ImportTool extends MobxLitElement {
  private state = appState;

  static styles = css`
    textarea {
      width: 100%;
      height: 200px;
      font-family: monospace;
      font-size: 0.9rem;
      box-sizing: border-box;
    }
  `;

  @query('#file-upload')
  private fileUpload!: HTMLInputElement;

  @state()
  private fileName = '';

  @state()
  importResults: ImportResultType[] = [];

  @state()
  private importData: ExportDataContents | undefined;

  protected firstUpdated(): void {
    this.fileUpload.addEventListener(
      'change',
      this.handleFileSelected.bind(this),
    );
  }

  async handleZipFile(file: File): Promise<void> {
    try {
      const zip = new JSZip();
      const zipContents = await zip.loadAsync(file);

      const filePromises: Promise<void>[] = [];

      zipContents.forEach((relativePath, zipEntry) => {
        if (zipEntry.dir) {
          return;
        }

        const filePromise = zipEntry
          .async('string')
          .then((content: string): void => {
            //const filename = zipEntry.name.toLowerCase();

            try {
              this.importData = this.parseContent(content);
            } catch (error) {
              console.error('Error parsing content:', error);
            }

            console.log(this.importData);
          });

        filePromises.push(filePromise);
      });

      await Promise.all(filePromises);

      this.requestUpdate();

      //this.importData = zipContents;

      this.importResults = [ImportResultType.ZIP_IMPORTED];
    } catch (error) {
      console.error('Error processing ZIP file:', error);
    }
  }

  parseContent(content: string): ExportDataContents {
    try {
      const data = JSON.parse(content) as ExportDataContents;
      return data;
    } catch (error) {
      console.error('Error parsing content:', error);
      throw error;
    }
  }

  async import(): Promise<void> {
    if (!this.importData) {
      console.error('No import data available');
      return;
    }

    const result = await storage.import(this.importData);

    if (!result) {
      addToast(translate('importFailure'), NotificationType.ERROR);
      return;
    }

    addToast(translate('importSuccess'), NotificationType.SUCCESS);

    const entityConfigs = await storage.getEntityConfigs();
    this.state.setEntityConfigs(entityConfigs);
  }

  handleFileSelected(event: Event): void {
    //console.log('handleFileSelected');
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = (): void => {
        const content = reader.result as string;

        if (this.fileName.endsWith('.zip')) {
          this.handleZipFile(file);
        }

        if (this.fileName.endsWith('.json')) {
          this.handleJsonContents(content);
          this.importResults = [ImportResultType.JSON_IMPORTED];
        }

        fileInput.value = '';
      };
      reader.onerror = (): void => {
        console.error('Error reading file');
      };

      reader.readAsText(file);
    } else {
      this.fileName = '';
    }
  }

  handleJsonContents(content: string): void {
    try {
      const data = JSON.parse(content);
      console.log('Parsed JSON data:', data);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
    }
  }

  render(): TemplateResult {
    return html` <div class="import">
      <input type="file" id="file-upload" accept=".zip,.json" />

      <div class="results">
        ${repeat(
          this.importResults,
          result => result,
          result => html`<div>${result}</div>`,
        )}
      </div>

      <div class="buttons">
        <ss-button @click=${this.import}>${translate('importData')}</ss-button>
      </div>
    </div>`;
  }
}
