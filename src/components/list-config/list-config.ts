import { MobxLitElement } from '@adobe/lit-mobx';
import { css, CSSResult, html, nothing, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { storage } from '@/lib/Storage';
import { InputType } from '@ss/ui/components/ss-input.models';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-carousel';
import '@ss/ui/components/ss-select';

import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { ListConfigChangedEvent } from './list-config.events';
import { CarouselSlideChangedEvent } from '@ss/ui/components/ss-carousel.events';

import { theme } from '@/styles/theme';

@customElement('list-config')
export class ListConfig extends MobxLitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
        width: 100%;
        touch-action: none;
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
            font-size: 1rem;
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
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

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
  @state() navigationIndex: number = 0;

  @query('#config-selector') configSelector!: HTMLSelectElement;

  @state() get classes(): Record<string, boolean> {
    return {
      'list-config': true,
      'config-mode': this.state.selectListConfigMode,
      'edit-mode': this.state.editListConfigMode,
    };
  }

  @state() get carouselStyles(): CSSResult[] {
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

  async setup(): Promise<void> {
    const listConfigs = this.state.listConfigs;
    if (!listConfigs.length) {
      await this.addConfig();
    }

    this.sync();
    this.ready = true;
  }

  handleConfigChanged(e: SelectChangedEvent<string>): void {
    this.state.setEditListConfigMode(false);
    this.setListConfigId(e.detail.value);
    this.sync();
  }

  handleBoxClick(): void {
    this.state.setSelectListConfigMode(true);
  }

  enableEditMode(): void {
    this.state.setEditListConfigMode(true);
  }

  handleNameChanged(e: InputChangedEvent): void {
    this.name = e.detail.value;
  }

  async saveConfig(): Promise<void> {
    addToast(translate('configSaved'), NotificationType.SUCCESS);
    await storage.saveListConfig({
      id: this.id,
      name: this.name,
      filter: this.state.listFilter,
      sort: this.state.listSort,
      setting: this.state.listSetting,
    });
    this.state.setListConfigs(await storage.getListConfigs());
  }

  async deleteConfig(): Promise<void> {
    await storage.deleteListConfig(this.id);
    addToast(translate('configDeleted'), NotificationType.INFO);
    const listConfigs = await storage.getListConfigs();
    if (listConfigs.length) {
      this.setListConfigId(listConfigs[0].id);
    }
    this.state.setListConfigs(listConfigs);
    this.sync();
  }

  async addConfig(): Promise<void> {
    const id = await storage.addListConfig();
    addToast(translate('configAdded'), NotificationType.SUCCESS);
    const listConfigs = await storage.getListConfigs();
    this.state.setListConfigs(listConfigs);
    this.setListConfigId(id);
    this.sync();
  }

  sync(_reset = false): void {
    this.id = this.state.listConfig.id;
    this.name = this.state.listConfig.name;
    this.navigationIndex = this.state.listConfigs.findIndex(
      config => config.id === this.state.listConfig.id,
    );
  }

  setListConfigId(listConfigId: string): void {
    storage.saveActiveListConfigId(listConfigId);
    this.state.setListConfigId(listConfigId);
    this.dispatchEvent(new ListConfigChangedEvent({ listConfigId }));
  }

  render(): TemplateResult {
    return html`<div
      class=${classMap(this.classes)}
      @click=${this.handleBoxClick}
    >
      <ss-carousel
        infinite
        discrete
        showButtons
        height="180"
        width="100%"
        navigationIndex=${this.navigationIndex}
        @carousel-slide-changed=${(e: CarouselSlideChangedEvent): void => {
          this.state.setEditListConfigMode(false);
          this.state.setSelectListConfigMode(false);
          this.navigationIndex = e.detail.navigationIndex;
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
                    @click=${(e: MouseEvent): void => {
                      this.state.setSelectListConfigMode(false);
                      this.state.setEditListConfigMode(false);
                      e.stopPropagation();
                    }}
                  ></div>

                  <div class="config-name">${config.name}</div>

                  <div class="config">
                    <div class="edit">
                      <div class="name">
                        <ss-input
                          id="date"
                          @input-changed=${this.handleNameChanged}
                          type=${InputType.TEXT}
                          value=${config.name}
                        ></ss-input>
                      </div>

                      <div class="buttons">
                        <ss-button
                          text=${translate('saveConfiguration')}
                          @click=${this.saveConfig}
                        ></ss-button>

                        <ss-button
                          text=${translate('deleteConfiguration')}
                          @click=${this.deleteConfig}
                        ></ss-button>
                      </div>
                    </div>

                    <div class="edit-button">
                      <ss-button
                        @click=${this.enableEditMode}
                        text=${translate('editConfiguration')}
                      ></ss-button>

                      <ss-button
                        text=${translate('addConfiguration')}
                        @click=${this.addConfig}
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
}
