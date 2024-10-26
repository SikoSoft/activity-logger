import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import { SelectChangedEvent } from '@/events/select-changed';

import '@/components/ss-select';

import { theme } from '@/styles/theme';
import {
  ListContextType,
  ListContextUnit,
  ListContext as ListContextSpec,
} from 'api-spec/models/List';
import { classMap } from 'lit/directives/class-map.js';
import { ListContextUpdatedEvent } from '@/events/list-context-updated';
import { storage } from '@/lib/Storage';

const quantityMap: Record<ListContextUnit, number[]> = {
  [ListContextUnit.MINUTE]: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 45, 50, 55, 60,
  ],
  [ListContextUnit.HOUR]: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],
  [ListContextUnit.DAY]: [1, 2, 3, 4, 5, 6, 7],
};

const contextUnitMsgMap: Record<ListContextUnit, string> = {
  [ListContextUnit.MINUTE]: msg('contextUnit.minute'),
  [ListContextUnit.HOUR]: msg('contextUnit.hour'),
  [ListContextUnit.DAY]: msg('contextUnit.day'),
};

const contextTypeMsgMap: Record<ListContextType, string> = {
  [ListContextType.BEFORE]: msg('contextType.before'),
  [ListContextType.AFTER]: msg('contextUnit.after'),
};

@customElement('list-context')
export class ListContext extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;

        .input {
          opacity: 0.3;
          pointer-events: none;
        }

        &.enabled {
          .input {
            opacity: 1;
            pointer-events: initial;
          }
        }
      }
    `,
  ];

  private state = appState;

  @state() get quantities(): number[] {
    return quantityMap[this.state.listContext.unit];
  }

  private _handleToggleEnabled(e: InputEvent) {
    const mode = !this.state.listContextMode;
    this.state.setListContextMode(mode);
    storage.saveListContextMode(mode);
  }

  private _handleTypeChanged(e: SelectChangedEvent<ListContextType>) {
    this.setListContext({
      ...this.state.listContext,
      type: e.detail.value,
    });
  }

  private _handleQuantityChanged(e: SelectChangedEvent<number>) {
    this.setListContext({
      ...this.state.listContext,
      quantity: e.detail.value,
    });
  }

  private _handleUnitChanged(e: SelectChangedEvent<ListContextUnit>) {
    this.setListContext({
      ...this.state.listContext,
      unit: e.detail.value,
    });
  }

  private setListContext(listContext: ListContextSpec) {
    this.state.setListContext(listContext);
    storage.saveListContext(listContext);
  }

  private _handleUpdateClick() {
    this.dispatchEvent(
      new ListContextUpdatedEvent({ listContext: this.state.listContext }),
    );
  }

  @state() get classes() {
    return { box: true, enabled: this.state.listContextMode };
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div>
          <input
            type="checkbox"
            @change=${(e: InputEvent) => {
              this._handleToggleEnabled(e);
            }}
            ?checked=${this.state.listContextMode}
          />
          ${msg('Include context')}
        </div>

        <div class="input">
          <ss-select
            selected=${this.state.listContext.type}
            @select-changed=${(e: SelectChangedEvent<ListContextType>) => {
              this._handleTypeChanged(e);
            }}
            .options=${Object.values(ListContextType).map(type => ({
              value: type,
              label: contextTypeMsgMap[type],
            }))}
          >
          </ss-select>

          <ss-select
            selected=${`${this.state.listContext.quantity}`}
            @select-changed=${(e: SelectChangedEvent<number>) => {
              this._handleQuantityChanged(e);
            }}
            .options=${this.quantities.map(quantity => ({
              value: `${quantity}`,
              label: `${quantity}`,
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listContext.unit}
            @select-changed=${(e: SelectChangedEvent<ListContextUnit>) => {
              this._handleUnitChanged(e);
            }}
            .options=${Object.values(ListContextUnit).map(type => ({
              value: type,
              label: contextUnitMsgMap[type],
            }))}
          >
          </ss-select>

          <ss-button
            @click=${() => {
              this._handleUpdateClick();
            }}
            text=${msg('useContext')}
          ></ss-button>
        </div>
      </div>
    `;
  }
}
