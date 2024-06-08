import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@/components/ss-select';
import { translate } from '@/util/strings';
import { appState } from '@/state';
import { SelectChangedEvent } from '@/lib/Event';
import { ListSortDirection, ListSortProperty } from 'api-spec/models/List';
import { theme } from '@/styles/theme';
import { SortUpdatedEvent } from '@/events/sort-updated';

@customElement('list-sort')
export class ListSort extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
      }
    `,
  ];

  private state = appState;

  private _handlePropertyChanged(e: SelectChangedEvent) {
    console.log('handlePropertyChanged', e.detail.value);
    const property = e.detail.value as ListSortProperty;
    const sort = {
      property,
      direction: this.state.listSort.direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new SortUpdatedEvent({ sort }));
  }

  private _handleDirectionChanged(e: SelectChangedEvent) {
    console.log('handlePropertyChanged', e.detail.value);
    const direction = e.detail.value as ListSortDirection;
    const sort = {
      property: this.state.listSort.property,
      direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new SortUpdatedEvent({ sort }));
  }

  render() {
    return html`
      <div class="box">
        <div>${translate('sortBy')}</div>
        <div>
          <ss-select
            selected=${this.state.listSort.property}
            @select-changed=${(e: SelectChangedEvent) => {
              this._handlePropertyChanged(e);
            }}
            .options=${Object.values(ListSortProperty).map(type => ({
              value: type,
              label: translate(type),
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listSort.direction}
            @select-changed=${(e: SelectChangedEvent) => {
              this._handleDirectionChanged(e);
            }}
            .options=${Object.values(ListSortDirection).map(type => ({
              value: type,
              label: translate(type),
            }))}
          >
          </ss-select>
        </div>
      </div>
    `;
  }
}
