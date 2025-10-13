import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { translate } from '@/lib/Localization';
import JSZip from 'jszip';

@customElement('import-tool')
export class ImportTool extends LitElement {
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
            const filename = zipEntry.name.toLowerCase();
          });

        filePromises.push(filePromise);
      });

      await Promise.all(filePromises);

      this.requestUpdate();
    } catch (error) {
      console.error('Error processing ZIP file:', error);
    }
  }

  handleFileSelected(event: Event): void {
    console.log('handleFileSelected');
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

  render(): TemplateResult {
    return html` <div class="import">
      <input type="file" id="file-upload" accept=".zip,.json" />

      <div class="buttons">
        <ss-button>${translate('importData')}</ss-button>
      </div>
    </div>`;
  }
}
