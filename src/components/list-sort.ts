import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ListSortDirection, ListSortProperty } from 'api-spec/models/List';

import { translate } from '@/util/strings';
import { appState } from '@/state';

import { SelectChangedEvent } from '@/events/select-changed';
import { SortUpdatedEvent } from '@/events/sort-updated';

import '@/components/ss-select';

import { theme } from '@/styles/theme';

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

  private _handlePropertyChanged(e: SelectChangedEvent<string>) {
    console.log('handlePropertyChanged', e.detail.value);
    const property = e.detail.value as ListSortProperty;
    const sort = {
      property,
      direction: this.state.listSort.direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new SortUpdatedEvent({ sort }));
  }

  private _handleDirectionChanged(e: SelectChangedEvent<string>) {
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
            @select-changed=${(e: SelectChangedEvent<string>) => {
              this._handlePropertyChanged(e);
            }}
            .options=${Object.values(ListSortProperty).map(type => ({
              value: type,
              label: translate(`sort.property.${type}`),
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listSort.direction}
            @select-changed=${(e: SelectChangedEvent<string>) => {
              this._handleDirectionChanged(e);
            }}
            .options=${Object.values(ListSortDirection).map(type => ({
              value: type,
              label: translate(`sort.direction.${type}`),
            }))}
          >
          </ss-select>
        </div>
      </div>
    `;
  }
}
