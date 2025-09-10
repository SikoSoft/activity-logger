import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

import { TextContext, TextType } from 'api-spec/models/List';
import {
  TextFiltersProp,
  textFiltersProps,
  TextFiltersProps,
} from './text-filters.models';

import { TextFiltersUpdatedEvent } from './text-filters.events';
import {
  TextFilterUpdatedEvent,
  TextFilterSaveEvent,
} from './text-filter/text-filter.events';

import '@/components/list-filter/text-filters/text-filter/text-filter';

import { theme } from '@/styles/theme';

@customElement('text-filters')
export class TextFilters extends LitElement {
  static styles = [theme];

  @property({ type: Array })
  [TextFiltersProp.FILTERS]: TextFiltersProps[TextFiltersProp.FILTERS] =
    textFiltersProps[TextFiltersProp.FILTERS].default;

  @state() newFilter: TextContext = {
    type: TextType.CONTAINS,
    subStr: '',
  };

  connectedCallback(): void {
    super.connectedCallback();
  }

  private handleFilterUpdated(e: TextFilterUpdatedEvent) {
    const textFilter = e.detail;
    if (textFilter.index === -1) {
      this.newFilter = {
        type: textFilter.type,
        subStr: textFilter.subStr,
      };
      return;
    }

    const filters = this.filters.map((filter, index) =>
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

  private handleSave(e: TextFilterSaveEvent) {
    const filters: TextContext[] =
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
          (filter, index) => `${filter.type}/${index}`,
          (filter, index) => html`
            <text-filter
              index=${index}
              type=${filter.type}
              subStr=${filter.subStr}
              @text-filter-updated=${this.handleFilterUpdated}
              @text-filter-save=${this.handleSave}
            ></text-filter>
          `,
        )}

        <text-filter
          type=${this.newFilter.type}
          subStr=${this.newFilter.subStr}
          @text-filter-updated=${this.handleFilterUpdated}
          @text-filter-save=${this.handleSave}
        ></text-filter>

        <div></div>
      </fieldset>
    `;
  }
}
