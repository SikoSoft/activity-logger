import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

import { TextContext, TextType } from 'api-spec/models/List';

import { TextFiltersUpdatedEvent } from '@/events/text-filters-updated';
import { TextFilterUpdatedEvent } from '@/events/text-filter-updated';
import { TextFilterSaveEvent } from '@/events/text-filter-save';

import '@/components/tag/tag-manager';
import '@/components/filter/text-filter';

import { theme } from '@/styles/theme';

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

  private _handleFilterUpdated(e: TextFilterUpdatedEvent) {
    const textFilter = e.detail;
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

  render() {
    return html`
      <fieldset>
        <legend>${msg('Text')}</legend>

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
