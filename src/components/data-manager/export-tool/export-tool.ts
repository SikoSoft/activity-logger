import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { saveAs } from 'file-saver';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-select';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import JSZip from 'jszip';
import { FileName } from '../data-manager.models';
import { addToast } from '@/lib/Util';

@customElement('export-tool')
export class ExportTool extends MobxLitElement {
  private state = appState;

  static styles = css`
    .export-tool {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .include-type {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  @state()
  exporting: boolean = false;

  @state()
  includeConfigs: boolean = true;

  @state()
  includeEntities: boolean = true;

  @state()
  configsJson: string = '';

  @state()
  entitiesJson: string = '';

  toggleConfigs() {
    this.includeConfigs = !this.includeConfigs;
  }

  toggleEntities() {
    this.includeEntities = !this.includeEntities;
  }

  mapConfigData(): string {
    return JSON.stringify(
      this.state.entityConfigs.map(config => {
        const { id, userId, ...rest } = config;
        return {
          ...rest,
          properties: rest.properties.map(prop => {
            const { id, entityConfigId, userId, ...propRest } = prop;
            return propRest;
          }),
        };
      }),
    );
  }

  async exportData(): Promise<void> {
    try {
      const zip = new JSZip();

      if (this.includeConfigs) {
        this.configsJson = this.mapConfigData();
        zip.file(FileName.CONFIGS, this.configsJson);
      }

      if (this.includeEntities) {
        //this.entitiesJson = JSON.stringify(this.state.entities, null, 2);
        zip.file(FileName.ENTITIES, this.entitiesJson);
      }

      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9,
        },
      });

      saveAs(content, `DataDump[].zip`);
      addToast(translate('fileDownloaded'), NotificationType.SUCCESS);
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    }
  }

  render() {
    return html`
      <div class="export-tool">
        <ss-select
          .options=${this.state.entityConfigs.map(config => ({
            label: config.name,
            value: config.id,
          }))}
        >
        </ss-select>

        <div class="include-type">
          <input
            type="checkbox"
            id="include-configs"
            ?checked=${this.includeConfigs}
            @change=${this.toggleConfigs}
          />
          <label for="include-configs">${translate('includeConfigs')}</label>
        </div>

        <div class="include-type">
          <input
            type="checkbox"
            id="include-entities"
            ?checked=${this.includeEntities}
            @change=${this.toggleEntities}
          />
          <label for="include-entities">${translate('includeEntities')}</label>
        </div>

        <ss-button
          ?disabled=${!this.includeConfigs && !this.includeEntities}
          @click=${this.exportData}
          >${translate('exportData')}</ss-button
        >
      </div>
    `;
  }
}
