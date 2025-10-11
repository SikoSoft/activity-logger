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
import { baseFileName, ExportDataType, FileName } from '../data-manager.models';
import { addToast } from '@/lib/Util';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';

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

  @state()
  fileName: string = `${baseFileName}.zip`;

  @state()
  selectedConfigIds: number[] = []; //this.state.entityConfigs.map(c => c.id);

  toggleConfigs() {
    this.includeConfigs = !this.includeConfigs;
    this.resetFileName();
  }

  toggleEntities() {
    this.includeEntities = !this.includeEntities;
    this.resetFileName();
  }

  mapConfigData(): string {
    const configData = [];
    for (const config of this.state.entityConfigs) {
      const { id, userId, ...rest } = config;
      if (this.selectedConfigIds.includes(id)) {
        configData.push({
          ...rest,
          properties: rest.properties.map(prop => {
            const { id, entityConfigId, userId, ...propRest } = prop;
            return propRest;
          }),
        });
      }
    }
    return JSON.stringify(configData);
  }

  async exportData(): Promise<void> {
    try {
      const zip = new JSZip();

      if (this.includeConfigs) {
        this.configsJson = this.mapConfigData();
        zip.file(FileName.CONFIGS, this.configsJson);
      }

      if (this.includeEntities) {
        zip.file(FileName.ENTITIES, this.entitiesJson);
      }

      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9,
        },
      });

      saveAs(content, this.fileName);
      addToast(translate('fileDownloaded'), NotificationType.SUCCESS);
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    }
  }

  resetFileName(): void {
    if (
      this.selectedConfigIds.length === 0 ||
      (!this.includeConfigs && !this.includeEntities)
    ) {
      this.fileName = `${baseFileName}.zip`;
      return;
    }

    const configNames: string[] = [];
    for (const configId of this.selectedConfigIds) {
      const config = this.state.entityConfigs.find(c => c.id === configId);
      if (config) {
        configNames.push(config.name);
      }
    }

    const dataTypes: string[] = [];
    if (this.includeConfigs) {
      dataTypes.push(ExportDataType.CONFIGS);
    }
    if (this.includeEntities) {
      dataTypes.push(ExportDataType.ENTITIES);
    }

    this.fileName = `${baseFileName}[${configNames.join(',')}](${dataTypes.join(',')}).zip`;
  }

  updateFileName(e: InputChangedEvent) {
    this.fileName = e.detail.value;
  }

  handleConfigsChanged(e: SelectChangedEvent<string[]>) {
    const selectedValue = e.detail.value;

    this.selectedConfigIds = selectedValue.map(v => parseInt(v, 10));
    this.resetFileName();
  }

  render() {
    return html`
      <div class="export-tool">
        <ss-select
          multiple
          .selected=${this.selectedConfigIds.map(id => id.toString())}
          @select-changed=${this.handleConfigsChanged}
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

        <div class="file-name">
          <ss-input
            value=${this.fileName}
            label=${translate('fileName')}
            @input-changed=${this.updateFileName}
          ></ss-input>
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
