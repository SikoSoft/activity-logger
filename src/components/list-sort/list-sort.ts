import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ListSortDirection, ListSortProperty } from 'api-spec/models/List';
import { appState } from '@/state';
import { translate } from '@/lib/Localization';

import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';
import { ListSortUpdatedEvent } from './list-sort.events';

import '@ss/ui/components/ss-select';

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

  private handlePropertyChanged(e: SelectChangedEvent<string>): void {
    const property = e.detail.value as ListSortProperty;
    const sort = {
      property,
      direction: this.state.listSort.direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new ListSortUpdatedEvent({ sort }));
  }

  private handleDirectionChanged(e: SelectChangedEvent<string>): void {
    const direction = e.detail.value as ListSortDirection;
    const sort = {
      property: this.state.listSort.property,
      direction,
    };
    this.state.setListSort(sort);
    this.dispatchEvent(new ListSortUpdatedEvent({ sort }));
  }

  render(): TemplateResult {
    return html`
      <div class="box">
        <div>${translate('sortBy')}</div>
        <div>
          <ss-select
            selected=${this.state.listSort.property}
            @select-changed=${(e: SelectChangedEvent<string>) => {
              this.handlePropertyChanged(e);
            }}
            .options=${Object.values(ListSortProperty).map(type => ({
              value: type,
              label: translate(`sortProperty.${type}`),
            }))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listSort.direction}
            @select-changed=${(e: SelectChangedEvent<string>) => {
              this.handleDirectionChanged(e);
            }}
            .options=${Object.values(ListSortDirection).map(type => ({
              value: type,
              label: translate(`sortDirection.${type}`),
            }))}
          >
          </ss-select>
        </div>
      </div>
    `;
  }
}
