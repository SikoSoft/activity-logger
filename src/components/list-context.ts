import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { translate } from '@/util/strings';
import { appState } from '@/state';

import { SelectChangedEvent } from '@/events/select-changed';

import '@/components/ss-select';

import { theme } from '@/styles/theme';
import { ListContextType, ListContextUnit } from 'api-spec/models/List';
import { ToggleChangedEvent } from '@/events/toggle-changed';
import { InputChangedEvent } from '@/events/input-changed';
import { classMap } from 'lit/directives/class-map.js';
import { ListContextUpdatedEvent } from '@/events/list-context-updated';

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
    //console.log();
    this.state.setListContextMode(!this.state.listContextMode);
  }

  private _handleTypeChanged(e: SelectChangedEvent<ListContextType>) {
    this.state.setListContext({
      ...this.state.listContext,
      type: e.detail.value,
    });
  }

  private _handleQuantityChanged(e: SelectChangedEvent<number>) {
    this.state.setListContext({
      ...this.state.listContext,
      quantity: e.detail.value,
    });
  }

  private _handleUnitChanged(e: SelectChangedEvent<ListContextUnit>) {
    this.state.setListContext({
      ...this.state.listContext,
      unit: e.detail.value,
    });
  }

  private _handleUpdateClick() {
    console.log('handleUpdateClick');
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
          ${translate('includeContext')}
        </div>

        <div class="input">
          <ss-select
            selected=${this.state.listSort.property}
            @select-changed=${(e: SelectChangedEvent<ListContextType>) => {
              this._handleTypeChanged(e);
            }}
            .options=${Object.values(ListContextType).map(type => ({
              value: type,
              label: translate(`contextType.${type}`),
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listContext.quantity}
            @select-changed=${(e: SelectChangedEvent<number>) => {
              this._handleQuantityChanged(e);
            }}
            .options=${this.quantities.map(quantity => ({
              value: quantity,
              label: translate(`${quantity}`),
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
              label: translate(`contextUnit.${type}`),
            }))}
          >
          </ss-select>

          <ss-button
            @click=${() => {
              this._handleUpdateClick();
            }}
            text=${translate('useContext')}
          ></ss-button>
        </div>
      </div>
    `;
  }
}
