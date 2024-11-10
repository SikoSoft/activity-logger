import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-select';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { ListConfigChangedEvent } from '@/events/list-config-changed';
import { InputType } from '@/models/Input';
import { storage } from '@/lib/Storage';

import { theme } from '@/styles/theme';

@customElement('list-config')
export class ListConfig extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ];

  private state = appState;

  @state() id: string = '';
  @state() name: string = '';
  @state() ready: boolean = false;

  @query('#config-selector') configSelector!: HTMLSelectElement;

  connectedCallback(): void {
    super.connectedCallback();

    this.setup();
  }

  async setup() {
    const listConfigs = await storage.getListConfigs();
    if (!listConfigs.length) {
      await this._addConfig();
    }

    this.sync();
    this.ready = true;
  }

  _handleConfigChanged(e: SelectChangedEvent<string>) {
    this.state.setEditListConfigMode(false);
    this.setListConfigId(e.detail.value);
    this.sync();
  }

  _handleBoxClick() {
    this.state.setSelectListConfigMode(true);
  }

  _enableEditMode() {
    this.state.setEditListConfigMode(true);
  }

  _handleNameChanged(e: InputChangedEvent) {
    this.name = e.detail.value;
  }

  async _saveConfig() {
    console.log('saveConfig');
    this.state.addToast(msg('The configuration has been saved'));
    storage.saveListConfig({
      id: this.id,
      name: this.name,
      filter: this.state.listFilter,
      sort: this.state.listSort,
    });
    this.state.setListConfigs(await storage.getListConfigs());
  }

  async _deleteConfig() {
    console.log('deleteConfig');
    await storage.deleteListConfig(this.id);
    this.state.addToast(msg('The configuration has been deleted'));
    this.state.setListConfigs(await storage.getListConfigs());
    if (this.state.listConfigs.length) {
      this.setListConfigId(this.state.listConfigs[0].id);
    }
    this.sync();
  }

  async _addConfig() {
    console.log('addConfig');
    const id = await storage.addListConfig();
    this.state.addToast(msg('The configuration has been added'));
    this.state.setListConfigs(await storage.getListConfigs());
    this.setListConfigId(id);
    this.sync();
  }

  sync() {
    this.id = this.state.listConfig.id;
    this.name = this.state.listConfig.name;
  }

  setListConfigId(listConfigId: string) {
    console.log('setListConfigId', listConfigId);
    storage.saveActiveListConfigId(listConfigId);
    this.state.setListConfigId(listConfigId);
    this.dispatchEvent(new ListConfigChangedEvent({ listConfigId }));
  }

  render() {
    return html`
      <div class="box" @click=${this._handleBoxClick}>
        ${this.ready
          ? html`
              ${this.state.selectListConfigMode
                ? html`
                    <div class="select">
                      <ss-select
                        id="config-selector"
                        selected=${this.state.listConfigId}
                        @select-changed=${(e: SelectChangedEvent<string>) => {
                          this._handleConfigChanged(e);
                        }}
                        .options=${Object.values(this.state.listConfigs).map(
                          config => ({
                            value: config.id,
                            label: config.name,
                          }),
                        )}
                      >
                      </ss-select>
                    </div>

                    ${this.state.editListConfigMode
                      ? html`
                          <div class="manage">
                            <div class="id">${msg('ID')}: ${this.id}</div>

                            <div class="name">
                              <ss-input
                                id="date"
                                @input-changed=${this._handleNameChanged}
                                type=${InputType.TEXT}
                                value=${this.name}
                              ></ss-input>
                            </div>

                            <div class="buttons">
                              <ss-button
                                text=${msg('Save configuration')}
                                @click=${this._saveConfig}
                              ></ss-button>
                              <ss-button
                                text=${msg('Delete configuration')}
                                @click=${this._deleteConfig}
                              ></ss-button>
                              <ss-button
                                text=${msg('Add configuration')}
                                @click=${this._addConfig}
                              ></ss-button>
                            </div>
                          </div>
                        `
                      : html`
                          <ss-button
                            @click=${this._enableEditMode}
                            text=${msg('Manage configuration')}
                          ></ss-button>
                        `}
                  `
                : html` ${this.state.listConfig.name} `}
            `
          : html`<ss-loader></ss-loader>`}
      </div>
    `;
  }
}
