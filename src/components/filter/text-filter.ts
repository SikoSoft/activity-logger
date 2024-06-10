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
import { TextFilterUpdatedEvent } from '@/events/text-filter-updated';
import { InputChangedEvent } from '@/events/input-changed';
import { theme } from '@/styles/theme';
import { InputSubmittedEvent } from '@/events/input-submitted';
import { TextFilterSaveEvent } from '@/events/text-filter-save';

@customElement('text-filter')
export class TextFilter extends LitElement {
  static styles = [theme];
  @property() type: TextType = TextType.CONTAINS;
  @property() subStr: string = '';
  @property({ type: Number }) index: number = -1;

  private _handleTypeChanged(e: SelectChangedEvent) {
    const type = e.detail.value as TextType;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type,
        subStr: this.subStr,
      }),
    );
  }

  private _handleSubStrChanged(e: InputChangedEvent) {
    const subStr = e.detail.value;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type: this.type,
        subStr,
      }),
    );
  }

  private _handleSubStrSubmitted(e: InputChangedEvent) {
    console.log('subStr Submitted');
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  private _handleButtonClicked() {
    console.log('button clicked');
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
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

        <ss-input
          value=${this.subStr}
          @input-changed=${(e: InputChangedEvent) => {
            this._handleSubStrChanged(e);
          }}
          @input-submitted=${(e: InputSubmittedEvent) => {
            this._handleSubStrSubmitted(e);
          }}
        ></ss-input>

        <ss-button
          text=${this.index === -1 ? '+' : '-'}
          @click=${this._handleButtonClicked}
        ></ss-button>
      </fieldset>
    `;
  }
}
