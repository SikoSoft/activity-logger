import { translate } from '@/util/strings';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@/components/tag/tag-manager';
import '@/components/filter/text-filter';
import {
  ListFilterTimeType,
  TextContext,
  TextType,
  TimeContext,
} from 'api-spec/models/List';
import { SelectChangedEvent } from '@/lib/Event';
import { TextFiltersUpdatedEvent } from '@/events/text-filters-updated';
import { theme } from '@/styles/theme';
import { repeat } from 'lit/directives/repeat.js';
import { TextFilterUpdatedEvent } from '@/events/text-filter-updated';
import { TextFilterSaveEvent } from '@/events/text-filter-save';

@customElement('text-filters')
export class TextFilters extends LitElement {
  static styles = [theme];

  @property({ type: Array }) filters: TextContext[] = [];

  @state() newFilter: TextContext = {
    type: TextType.CONTAINS,
    subStr: '',
  };

  connectedCallback(): void {
    super.connectedCallback();
  }

  private _handleTypeChanged(e: SelectChangedEvent) {
    //this.type = e.detail.value as ListFilterTimeType;
    //this._sendUpdatedEvent();
  }

  private _handleFilterUpdated(e: TextFilterUpdatedEvent) {
    const textFilter = e.detail;
    console.log('filterUpdated', e.detail);
    if (textFilter.index === -1) {
      this.newFilter = {
        type: textFilter.type,
        subStr: textFilter.subStr,
      };
      return;
    }

    let filters = this.filters.map((filter, index) =>
      index === textFilter.index
        ? { type: textFilter.type, subStr: textFilter.subStr }
        : filter,
    );
    this.dispatchEvent(
      new TextFiltersUpdatedEvent({
        filters,
      }),
    );
  }

  private _handleSave(e: TextFilterSaveEvent) {
    let filters: TextContext[] =
      e.detail.index === -1
        ? [...this.filters, this.newFilter]
        : [...this.filters.filter((filter, i) => i !== e.detail.index)];

    this.dispatchEvent(
      new TextFiltersUpdatedEvent({
        filters,
      }),
    );
  }

  private _sendUpdatedEvent(): void {
    // this.dispatchEvent(new TextFiltersUpdatedEvent({ text: [] }));
  }

  render() {
    return html`
      <fieldset>
        <legend>${translate('text')}</legend>

        ${repeat(
          this.filters,
          filter => `${filter.type}/${filter.subStr}`,
          (filter, index) => html`
            <text-filter
              index=${index}
              type=${filter.type}
              subStr=${filter.subStr}
              @text-filter-updated=${this._handleFilterUpdated}
              @text-filter-save=${this._handleSave}
            ></text-filter>
          `,
        )}

        <text-filter
          type=${this.newFilter.type}
          subStr=${this.newFilter.subStr}
          @text-filter-updated=${this._handleFilterUpdated}
          @text-filter-save=${this._handleSave}
        ></text-filter>

        <div></div>
      </fieldset>
    `;
  }
}
