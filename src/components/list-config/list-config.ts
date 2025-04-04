import { MobxLitElement } from '@adobe/lit-mobx';
import { css, CSSResult, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-carousel';
import '@ss/ui/components/ss-select';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { ListConfigChangedEvent } from './list-config.events';
import { InputType } from '@/models/Input';
import { storage } from '@/lib/Storage';

import { theme } from '@/styles/theme';
import { classMap } from 'lit/directives/class-map.js';
import { addToast } from '@/lib/Util';
import { CarouselSlideChangedEvent } from '@ss/ui/components/ss-carousel.events';

@customElement('list-config')
export class ListConfig extends MobxLitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .list-config {
        padding: 1rem;
        margin-bottom: 1rem;
        position: relative;

        .close {
          pointer-events: none;
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 100;

          &::before {
            content: 'X';
          }
        }

        .config {
          transition: all 0.3s;
          opacity: 0;
          //height: 0;
        }

        .config-name {
          transition: all 0.3s;
          opacity: 1;
          font-size: 2rem;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
        }

        .edit {
          display: none;
        }

        .edit-button {
          display: block;
        }

        &.config-mode {
          .close {
            opacity: 1;
            pointer-events: initial;
            cursor: pointer;
          }

          .config {
            opacity: 1;
          }

          .config-name {
            opacity: 0;
            font-size: 0;
          }
        }

        &.edit-mode {
          .edit {
            display: block;
          }

          .edit-button {
            display: none;
          }
        }
      }
    `,
  ];
  private defaultModeStyles = css`
    .config-slide {
      .config {
        display: none;
      }
    }
  `;
  private editModeStyles = css`
    .config-slide {
      .config {
        display: block;
      }
    }
  `;
  private configModeStyles = css`
    .config-slide {
      .config {
        display: block;
      }
    }
  `;

  private state = appState;

  @state() id: string = '';
  @state() name: string = '';
  @state() ready: boolean = false;

  @query('#config-selector') configSelector!: HTMLSelectElement;

  @state() get classes() {
    return {
      'list-config': true,
      'config-mode': this.state.selectListConfigMode,
      'edit-mode': this.state.editListConfigMode,
    };
  }

  @state() get carouselStyles(): CSSResult[] {
    console.log(
      'carouselStyles',
      this.state.editListConfigMode,
      this.setListConfigId,
    );
    const styles: CSSResult[] = [this.defaultModeStyles];
    if (this.state.editListConfigMode) {
      styles.push(this.editModeStyles);
    }
    if (this.state.selectListConfigMode) {
      styles.push(this.configModeStyles);
    }
    return styles;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.setup();
  }

  async setup() {
    const listConfigs = this.state.listConfigs;
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
    addToast(msg('The configuration has been saved'));
    await storage.saveListConfig({
      id: this.id,
      name: this.name,
      filter: this.state.listFilter,
      sort: this.state.listSort,
      setting: this.state.listSetting,
    });
    this.state.setListConfigs(await storage.getListConfigs());
  }

  async _deleteConfig() {
    await storage.deleteListConfig(this.id);
    addToast(msg('The configuration has been deleted'));
    const listConfigs = await storage.getListConfigs();
    if (listConfigs.length) {
      this.setListConfigId(listConfigs[0].id);
    }
    this.state.setListConfigs(listConfigs);
    this.sync();
  }

  async _addConfig() {
    const id = await storage.addListConfig();
    addToast(msg('The configuration has been added'));
    const listConfigs = await storage.getListConfigs();
    this.state.setListConfigs(listConfigs);
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
    return html`<div
      class=${classMap(this.classes)}
      @click=${this._handleBoxClick}
    >
      <ss-carousel
        infinite
        discrete
        showButtons
        height="180"
        width="100%"
        @carousel-slide-changed=${(e: CarouselSlideChangedEvent) => {
          this.state.setEditListConfigMode(false);
          this.state.setSelectListConfigMode(false);
          this.setListConfigId(this.state.listConfigs[e.detail.slideIndex].id);
        }}
      >
        ${this.ready
          ? repeat(
              this.state.listConfigs,
              config => config.id,
              config =>
                html`<div class="config-slide">
                  <div
                    class="close"
                    @click=${(e: MouseEvent) => {
                      console.log('close');
                      this.state.setSelectListConfigMode(false);
                      this.state.setEditListConfigMode(false);
                      e.stopPropagation();
                    }}
                  ></div>

                  <div class="config-name">${config.name}</div>

                  <div class="config">
                    <div class="edit">
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
                      </div>
                    </div>
                    <div class="edit-button">
                      <ss-button
                        @click=${this._enableEditMode}
                        text=${msg('Edit configuration')}
                      ></ss-button>
                      <ss-button
                        text=${msg('Add configuration')}
                        @click=${this._addConfig}
                      ></ss-button>
                    </div>
                  </div>
                </div>`,
            )
          : nothing}
        <style>
          ${this.carouselStyles}
        </style>
      </ss-carousel>
    </div>`;
  }

  renderOld() {
    return html`
      <div class=${classMap(this.classes)} @click=${this._handleBoxClick}>
        ${this.ready
          ? html`
              <div
                class="close"
                @click=${(e: MouseEvent) => {
                  this.state.setSelectListConfigMode(false);
                  this.state.setEditListConfigMode(false);
                  e.stopPropagation();
                }}
              ></div>

              <div class="window">
                <div class="config-name">${this.state.listConfig.name}</div>

                <div class="config">
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

                  <div class="edit">
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
                    </div>
                  </div>
                  <div class="edit-button">
                    <ss-button
                      @click=${this._enableEditMode}
                      text=${msg('Edit configuration')}
                    ></ss-button>
                    <ss-button
                      text=${msg('Add configuration')}
                      @click=${this._addConfig}
                    ></ss-button>
                  </div>
                </div>
              </div>
            `
          : html`<ss-loader></ss-loader>`}
      </div>
    `;
  }
}
