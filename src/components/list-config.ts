import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { appState } from '@/state';

import '@/components/ss-select';

import { theme } from '@/styles/theme';
import { SelectChangedEvent } from '@/lib/Event';
import { ListConfigChangedEvent } from '@/events/list-config-changed';
import { translate } from '@/util/strings';
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

  @state() id: string = this.state.listConfig.id;
  @state() name: string = this.state.listConfig.name;

  _handleConfigChanged(e: SelectChangedEvent) {
    console.log(e.detail.value);
    this.state.setListConfigId(e.detail.value);
    this.dispatchEvent(
      new ListConfigChangedEvent({ listConfigId: e.detail.value }),
    );
    this.sync();
  }

  _handleBoxClick() {
    this.state.setEditListConfigMode(true);
  }

  _handleNameChanged(e: InputChangedEvent) {
    console.log('handleNameChanged', e);
    this.name = e.detail.value;
  }

  _saveConfig() {
    console.log('saveConfig');
    storage.saveListConfig({
      id: this.id,
      name: this.name,
      filter: this.state.listFilter,
      sort: this.state.listSort,
    });
  }

  _deleteConfig() {
    console.log('deleteConfig');
    storage.deleteListConfig(this.id);
  }

  _addConfig() {
    console.log('addConfig');
    const id = storage.addListConfig();
    this.state.setListConfigId(id);
  }

  sync() {
    console.log('sync');
    this.id = this.state.listConfig.id;
    this.name = this.state.listConfig.name;
  }

  render() {
    return html`
      <div class="box" @click=${this._handleBoxClick}>
        ${this.state.editListConfigMode
          ? html`
              <ss-select
                selected=${this.state.listConfigId}
                @select-changed=${(e: SelectChangedEvent) => {
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

              <div class="id">${translate('id')}: ${this.id}</div>

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
                  text=${translate('saveConfig')}
                  @click=${this._saveConfig}
                ></ss-button>
                <ss-button
                  text=${translate('deleteConfig')}
                  @click=${this._deleteConfig}
                ></ss-button>
                <ss-button
                  text=${translate('addConfig')}
                  @click=${this._addConfig}
                ></ss-button>
              </div>
            `
          : html` ${this.state.listConfig.name} `}
      </div>
    `;
  }
}