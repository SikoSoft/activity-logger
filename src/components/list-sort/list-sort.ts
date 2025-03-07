import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { ListSortDirection, ListSortProperty } from 'api-spec/models/List';

import { appState } from '@/state';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { ListSortUpdatedEvent } from './list-sort.events';

import '@ss/ui/components/ss-select';

import { theme } from '@/styles/theme';

const sortPropertyMsgMap: Record<ListSortProperty, string> = {
  [ListSortProperty.CREATED_AT]: msg('sortProperty.createdAt'),
  [ListSortProperty.DESC]: msg('sortProperty.desc'),
  [ListSortProperty.OCCURRED_AT]: msg('sortProperty.occurredAt'),
};

const sortDirectionMsgMap: Record<ListSortDirection, string> = {
  [ListSortDirection.ASC]: msg('sortDirection.asc'),
  [ListSortDirection.DESC]: msg('sortDirection.desc'),
};

@customElement('list-sort')
@localized()
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
    const property = e.detail.value as ListSortProperty;
    const sort = {
      property,
      direction: this.state.listSort.direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new ListSortUpdatedEvent({ sort }));
  }

  private _handleDirectionChanged(e: SelectChangedEvent<string>) {
    const direction = e.detail.value as ListSortDirection;
    const sort = {
      property: this.state.listSort.property,
      direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new ListSortUpdatedEvent({ sort }));
  }

  render() {
    return html`
      <div class="box">
        <div>${msg('Sort by')}</div>
        <div>
          <ss-select
            selected=${this.state.listSort.property}
            @select-changed=${(e: SelectChangedEvent<string>) => {
              this._handlePropertyChanged(e);
            }}
            .options=${Object.values(ListSortProperty).map(type => ({
              value: type,
              label: sortPropertyMsgMap[type],
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
              label: sortDirectionMsgMap[type],
            }))}
          >
          </ss-select>
        </div>
      </div>
    `;
  }
}
