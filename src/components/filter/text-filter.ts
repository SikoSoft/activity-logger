import { translate } from '@/util/strings';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@/components/tag/tag-manager';
import {
  ListFilterTimeType,
  TextContext,
  TextType,
  TimeContext,
} from 'api-spec/models/List';
import { SelectChangedEvent } from '@/lib/Event';
import { TextFiltersUpdatedEvent } from '@/events/text-filters-updated';
import { InputChangedEvent } from '@/events/input-changed';
import { theme } from '@/styles/theme';

@customElement('text-filter')
export class TextFilter extends LitElement {
  static styles = [theme];
  @property() type: TextType = TextType.CONTAINS;
  @property() subStr: string = '';
  @property({ type: Number }) index: number = -1;

  private _handleTypeChanged(e: SelectChangedEvent) {
    //this.type = e.detail.value as TextType;
    this._sendUpdatedEvent();
  }

  private _handleSubStrChanged(e: InputChangedEvent) {}

  private _sendUpdatedEvent(): void {
    this.dispatchEvent(new TextFiltersUpdatedEvent({ text: [] }));
  }

  render() {
    return html`
      <fieldset>
        <ss-select
          selected=${this.type}
          @select-changed=${(e: SelectChangedEvent) => {
            this._handleTypeChanged(e);
          }}
          .options=${Object.values(TextType).map(type => ({
            value: type,
            label: translate(type),
          }))}
        ></ss-select>

        <ss-input></ss-input>

        <ss-button text=${this.index === -1 ? '+' : '-'}></ss-button>
      </fieldset>
    `;
  }
}
