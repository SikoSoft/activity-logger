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

@customElement('text-filters')
export class TextFilters extends LitElement {
  static styles = [theme];

  @property({ type: Array }) filters: TextContext[] = [];

  @state() newType: TextType = TextType.CONTAINS;
  @state() newSubStr: string = '';

  connectedCallback(): void {
    super.connectedCallback();
  }

  private _handleTypeChanged(e: SelectChangedEvent) {
    //this.type = e.detail.value as ListFilterTimeType;
    this._sendUpdatedEvent();
  }

  private _sendUpdatedEvent(): void {
    this.dispatchEvent(new TextFiltersUpdatedEvent({ text: [] }));
  }

  render() {
    return html`
      <fieldset>
        <legend>${translate('text')}</legend>

        <text-filter
          type=${this.newType}
          subStr=${this.newSubStr}
        ></text-filter>

        <div></div>
      </fieldset>
    `;
  }
}
