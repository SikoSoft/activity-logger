import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { TextType } from 'api-spec/models/List';

import { SelectChangedEvent } from '@/events/select-changed';
import { theme } from '@/styles/theme';

import { TextFilterUpdatedEvent } from '@/events/text-filter-updated';
import { InputChangedEvent } from '@/events/input-changed';
import { InputSubmittedEvent } from '@/events/input-submitted';
import { TextFilterSaveEvent } from '@/events/text-filter-save';

import '@/components/tag/tag-manager';

const textTypeMsgMap: Record<TextType, string> = {
  [TextType.CONTAINS]: msg('textType.contains'),
  [TextType.ENDS_WITH]: msg('textType.endsWith'),
  [TextType.STARTS_WITH]: msg('textType.startsWith'),
};

@customElement('text-filter')
export class TextFilter extends LitElement {
  static styles = [theme];
  @property() type: TextType = TextType.CONTAINS;
  @property() subStr: string = '';
  @property({ type: Number }) index: number = -1;

  private _handleTypeChanged(e: SelectChangedEvent<string>) {
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
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  private _handleButtonClicked() {
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  render() {
    return html`
      <fieldset>
        <ss-select
          selected=${this.type}
          @select-changed=${(e: SelectChangedEvent<string>) => {
            this._handleTypeChanged(e);
          }}
          .options=${Object.values(TextType).map(type => ({
            value: type,
            label: textTypeMsgMap[type],
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
