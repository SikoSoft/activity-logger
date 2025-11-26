import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  ListContextType,
  ListContextUnit,
  ListContext as ListContextSpec,
} from 'api-spec/models/List';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';
import { translate } from '@/lib/Localization';

import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';
import { ListContextUpdatedEvent } from './list-context.events';

import '@ss/ui/components/ss-select';
import { themed } from '@/lib/Theme';

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

@themed()
@customElement('list-context')
export class ListContext extends MobxLitElement {
  static styles = css`
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
  `;

  private state = appState;

  @state() get quantities(): number[] {
    return quantityMap[this.state.listContext.unit];
  }

  private handleToggleEnabled(_e: InputEvent): void {
    const mode = !this.state.listContextMode;
    this.state.setListContextMode(mode);
    storage.saveListContextMode(mode);
  }

  private handleTypeChanged(e: SelectChangedEvent<ListContextType>): void {
    this.setListContext({
      ...this.state.listContext,
      type: e.detail.value,
    });
  }

  private handleQuantityChanged(e: SelectChangedEvent<number>): void {
    this.setListContext({
      ...this.state.listContext,
      quantity: e.detail.value,
    });
  }

  private handleUnitChanged(e: SelectChangedEvent<ListContextUnit>): void {
    this.setListContext({
      ...this.state.listContext,
      unit: e.detail.value,
    });
  }

  private setListContext(listContext: ListContextSpec): void {
    this.state.setListContext(listContext);
    storage.saveListContext(listContext);
  }

  private handleUpdateClick(): void {
    this.dispatchEvent(
      new ListContextUpdatedEvent({ listContext: this.state.listContext }),
    );
  }

  @state() get classes(): Record<string, boolean> {
    return { box: true, enabled: this.state.listContextMode };
  }

  render(): TemplateResult {
    return html`
      <div class=${classMap(this.classes)}>
        <div>
          <input
            type="checkbox"
            @change=${this.handleToggleEnabled}
            ?checked=${this.state.listContextMode}
          />
          ${translate('includeContext')}
        </div>

        <div class="input">
          <ss-select
            selected=${this.state.listContext.type}
            @select-changed=${this.handleTypeChanged}
            .options=${Object.values(ListContextType).map(type => ({
              value: type,
              label: translate(`contextType.${type}`),
            }))}
          >
          </ss-select>

          <ss-select
            selected=${`${this.state.listContext.quantity}`}
            @select-changed=${this.handleQuantityChanged}
            .options=${this.quantities.map(quantity => ({
              value: `${quantity}`,
              label: `${quantity}`,
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listContext.unit}
            @select-changed=${this.handleUnitChanged}
            .options=${Object.values(ListContextUnit).map(type => ({
              value: type,
              label: translate(`contextUnit.${type}`),
            }))}
          >
          </ss-select>

          <ss-button
            @click=${this.handleUpdateClick}
            text=${translate('useContext')}
          ></ss-button>
        </div>
      </div>
    `;
  }
}
