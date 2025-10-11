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
import {
  baseFileName,
  ExportDataSet,
  ExportDataType,
  FileName,
} from '../data-manager.models';
import { addToast } from '@/lib/Util';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { repeat } from 'lit/directives/repeat.js';

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
  configsJson: string = '';

  @state()
  entitiesJson: string = '';

  @state()
  fileName: string = `${baseFileName}.zip`;

  @state()
  selectedDataSets: ExportDataSet[] = [];

  mapConfigData(): string {
    const configData = [];
    for (const config of this.state.entityConfigs) {
      const { id, userId, ...rest } = config;
      if (this.dataSetIsSelected(config.id, ExportDataType.CONFIGS)) {
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

      if (
        this.selectedDataSets.some(ds => ds.dataType === ExportDataType.CONFIGS)
      ) {
        this.configsJson = this.mapConfigData();
        zip.file(FileName.CONFIGS, this.configsJson);
      }

      if (
        this.selectedDataSets.some(
          ds => ds.dataType === ExportDataType.ENTITIES,
        )
      ) {
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
    if (!this.selectedDataSets.length) {
      this.fileName = `${baseFileName}.zip`;
      return;
    }

    const configs = this.state.entityConfigs.filter(c =>
      this.selectedDataSets.some(ds => ds.entityConfigId === c.id),
    );

    const entityStrs: string[] = [];

    for (const config of configs) {
      let entityStr = `${config.name.replace(/\s+/g, '-')}(`;
      const dataTypes: string[] = [];
      if (this.dataSetIsSelected(config.id, ExportDataType.CONFIGS)) {
        dataTypes.push(ExportDataType.CONFIGS);
      }
      if (this.dataSetIsSelected(config.id, ExportDataType.ENTITIES)) {
        dataTypes.push(ExportDataType.ENTITIES);
      }
      entityStr += `${dataTypes.join(',')})`;
      entityStrs.push(entityStr);
    }

    this.fileName = `${baseFileName}[${entityStrs.join(',')}].zip`;
  }

  updateFileName(e: InputChangedEvent) {
    this.fileName = e.detail.value;
  }

  handleDataSetChanged(entityConfigId: number, dataType: ExportDataType) {
    const isSelected = this.selectedDataSets.some(
      ds => ds.entityConfigId === entityConfigId && ds.dataType === dataType,
    );

    if (isSelected) {
      this.selectedDataSets = this.selectedDataSets.filter(
        ds =>
          !(ds.entityConfigId === entityConfigId && ds.dataType === dataType),
      );

      this.resetFileName();

      return;
    }

    this.selectedDataSets = [
      ...this.selectedDataSets,
      { entityConfigId, dataType },
    ];
    this.resetFileName();
  }

  dataSetIsSelected(entityConfigId: number, dataType: ExportDataType): boolean {
    return this.selectedDataSets.some(
      ds => ds.entityConfigId === entityConfigId && ds.dataType === dataType,
    );
  }

  render() {
    return html`
      <div class="export-tool">
        <div class="data-sets">
          ${repeat(
            this.state.entityConfigs,
            config => config.id,
            config => html`
              <div>
                <h3>${config.name}</h3>
                ${repeat(
                  Object.values(ExportDataType),
                  dataType => html`
                    <div class="include-type">
                      <input
                        type="checkbox"
                        id="${config.id}-${dataType}"
                        ?checked=${this.dataSetIsSelected(config.id, dataType)}
                        @change=${() =>
                          this.handleDataSetChanged(config.id, dataType)}
                      />
                      <label for="${config.id}-${dataType}">
                        ${dataType === ExportDataType.CONFIGS
                          ? translate('includeConfigs')
                          : translate('includeEntities')}
                      </label>
                    </div>
                  `,
                )}
              </div>
            `,
          )}
        </div>

        <div class="file-name">
          <ss-input
            value=${this.fileName}
            label=${translate('fileName')}
            @input-changed=${this.updateFileName}
          ></ss-input>
        </div>

        <ss-button
          ?disabled=${!this.selectedDataSets.length || this.exporting}
          @click=${this.exportData}
          >${translate('exportData')}</ss-button
        >
      </div>
    `;
  }
}
