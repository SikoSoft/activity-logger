import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { saveAs } from 'file-saver';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-select';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import JSZip from 'jszip';
import {
  baseFileName,
  ExportConfigData,
  ExportDataContents,
  ExportDataSet,
  ExportDataType,
} from '../data-manager.models';
import { addToast, sha256 } from '@/lib/Util';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { repeat } from 'lit/directives/repeat.js';
import { storage } from '@/lib/Storage';

@customElement('export-tool')
export class ExportTool extends MobxLitElement {
  private state = appState;

  static styles = css`
    .export-tool {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .include-type-header,
    .include-type {
      display: flex;
      align-items: left;
      gap: 0.5rem;
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

  @state()
  dataSetsHash: string = '';

  @state()
  get everythingIsSelected(): boolean {
    return (
      this.selectedDataSets.length ===
      this.state.entityConfigs.length * Object.values(ExportDataType).length
    );
  }

  mapConfigData(): ExportConfigData {
    const configData: ExportConfigData = [];
    for (const config of this.state.entityConfigs) {
      const { userId: _, properties, ...rest } = config;
      if (this.dataSetIsSelected(config.id, ExportDataType.CONFIGS)) {
        configData.push({
          ...rest,
          properties: properties.map(prop => {
            const { userId: __, ...propRest } = prop;
            return propRest;
          }),
        });
      }
    }
    return configData;
  }

  getEntityConfigIdsForData(): number[] {
    const ids = this.selectedDataSets
      .filter(ds => ds.dataType === ExportDataType.ENTITIES)
      .map(ds => ds.entityConfigId);
    return Array.from(new Set(ids));
  }

  async getEntityData(): Promise<string> {
    const data = await storage.export(this.getEntityConfigIdsForData());
    return JSON.stringify(data);
  }

  async exportData(): Promise<void> {
    try {
      const zip = new JSZip();

      const dataFile: ExportDataContents = {
        meta: {
          version: '0.0.0',
          date: new Date().toISOString(),
        },
        configs: [],
        entities: [],
      };

      if (
        this.selectedDataSets.some(ds => ds.dataType === ExportDataType.CONFIGS)
      ) {
        dataFile.configs = this.mapConfigData();
      }

      if (
        this.selectedDataSets.some(
          ds => ds.dataType === ExportDataType.ENTITIES,
        )
      ) {
        dataFile.entities = await storage.export(
          this.getEntityConfigIdsForData(),
        );
      }

      zip.file('data.json', JSON.stringify(dataFile, null, 2));

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

  updateFileName(e: InputChangedEvent): void {
    this.fileName = e.detail.value;
  }

  async handleDataSetChanged(
    entityConfigId: number,
    dataType: ExportDataType,
  ): Promise<void> {
    const isSelected = this.selectedDataSets.some(
      ds => ds.entityConfigId === entityConfigId && ds.dataType === dataType,
    );

    if (isSelected) {
      this.selectedDataSets = this.selectedDataSets.filter(
        ds =>
          !(ds.entityConfigId === entityConfigId && ds.dataType === dataType),
      );

      this.syncDataSets();
      return;
    }

    this.selectedDataSets = [
      ...this.selectedDataSets,
      { entityConfigId, dataType },
    ];
    this.syncDataSets();
  }

  async syncDataSets(): Promise<void> {
    this.dataSetsHash = await sha256(
      this.selectedDataSets
        .map(ds => `${ds.entityConfigId}-${ds.dataType}`)
        .join(','),
    );
    this.resetFileName();
  }

  dataSetIsSelected(entityConfigId: number, dataType: ExportDataType): boolean {
    return this.selectedDataSets.some(
      ds => ds.entityConfigId === entityConfigId && ds.dataType === dataType,
    );
  }

  entityConfigIdIsSelected(entityConfigId: number): boolean {
    return (
      this.dataSetIsSelected(entityConfigId, ExportDataType.CONFIGS) &&
      this.dataSetIsSelected(entityConfigId, ExportDataType.ENTITIES)
    );
  }

  selectEntityConfig(entityConfigId: number): void {
    this.handleDataSetChanged(entityConfigId, ExportDataType.CONFIGS);
    this.handleDataSetChanged(entityConfigId, ExportDataType.ENTITIES);
  }

  selectEverything(): void {
    if (this.everythingIsSelected) {
      this.selectedDataSets = [];
      this.syncDataSets();
      return;
    }

    const allDataSets: ExportDataSet[] = [];
    for (const config of this.state.entityConfigs) {
      for (const dataType of Object.values(ExportDataType)) {
        allDataSets.push({ entityConfigId: config.id, dataType });
      }
    }
    this.selectedDataSets = allDataSets;
    this.syncDataSets();
  }

  render(): TemplateResult {
    return html`
      <div class="export-tool">
        <div class="data-sets" data-hash=${this.dataSetsHash}>
          <div class="include-type-header">
            <input
              type="checkbox"
              id="everything"
              ?checked=${this.everythingIsSelected}
              @change=${(): void => this.selectEverything()}
            />
            <h3>${translate('everything')}</h3>
          </div>

          ${repeat(
            this.state.entityConfigs,
            config => `${this.dataSetsHash}-${config.id}`,
            config => html`
              <div>
                <div class="include-type-header">
                  <input
                    type="checkbox"
                    id="${config.id}-both"
                    ?checked=${this.entityConfigIdIsSelected(config.id)}
                    @change=${(): void => this.selectEntityConfig(config.id)}
                  />
                  <h3>${config.name}</h3>
                </div>

                ${repeat(
                  Object.values(ExportDataType),
                  dataType => html`
                    <div class="include-type">
                      <input
                        type="checkbox"
                        id="${config.id}-${dataType}"
                        ?checked=${this.dataSetIsSelected(config.id, dataType)}
                        @change=${(): Promise<void> =>
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
