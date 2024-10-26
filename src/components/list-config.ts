import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import '@/components/ss-select';

import { theme } from '@/styles/theme';
import { SelectChangedEvent } from '@/events/select-changed';
import { ListConfigChangedEvent } from '@/events/list-config-changed';
import { InputType } from '@/models/Input';
import { InputChangedEvent } from '@/events/input-changed';
import { storage } from '@/lib/Storage';

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

  connectedCallback(): void {
    super.connectedCallback();
    const listConfigs = storage.getListConfigs();
    if (!listConfigs.length) {
      this._addConfig();
    }
    this.sync();
  }

  _handleConfigChanged(e: SelectChangedEvent<string>) {
    this.setListConfigId(e.detail.value);
    this.sync();
  }

  _handleBoxClick() {
    this.state.setEditListConfigMode(true);
  }

  _handleNameChanged(e: InputChangedEvent) {
    this.name = e.detail.value;
  }

  _saveConfig() {
    storage.saveListConfig({
      id: this.id,
      name: this.name,
      filter: this.state.listFilter,
      sort: this.state.listSort,
    });
    this.state.setListConfigs(storage.getListConfigs());
  }

  _deleteConfig() {
    storage.deleteListConfig(this.id);
    this.state.setListConfigs(storage.getListConfigs());
    if (this.state.listConfigs.length) {
      this.setListConfigId(this.state.listConfigs[0].id);
    }
    this.sync();
  }

  _addConfig() {
    const id = storage.addListConfig();
    this.state.setListConfigs(storage.getListConfigs());
    this.setListConfigId(id);
    this.sync();
  }

  sync() {
    this.id = this.state.listConfig.id;
    this.name = this.state.listConfig.name;
  }

  setListConfigId(listConfigId: string) {
    storage.saveActiveListConfigId(listConfigId);
    this.state.setListConfigId(listConfigId);
    this.dispatchEvent(new ListConfigChangedEvent({ listConfigId }));
  }

  render() {
    return html`
      <div class="box" @click=${this._handleBoxClick}>
        ${this.state.editListConfigMode
          ? html`
              <ss-select
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
            `
          : html` ${this.state.listConfig.name} `}
      </div>
    `;
  }
}
