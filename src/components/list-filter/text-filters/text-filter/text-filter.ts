import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { TextType } from 'api-spec/models/List';
import {
  TextFilterProp,
  textFilterProps,
  TextFilterProps,
} from './text-filter.models';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import {
  TextFilterUpdatedEvent,
  TextFilterSaveEvent,
} from './text-filter.events';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { InputSubmittedEvent } from '@ss/ui/events/input-submitted';

import { theme } from '@/styles/theme';

const textTypeMsgMap: Record<TextType, string> = {
  [TextType.EQUALS]: msg('textType.equals'),
  [TextType.CONTAINS]: msg('textType.contains'),
  [TextType.ENDS_WITH]: msg('textType.endsWith'),
  [TextType.STARTS_WITH]: msg('textType.startsWith'),
};

@customElement('text-filter')
export class TextFilter extends LitElement {
  static styles = [theme];

  @property()
  [TextFilterProp.TYPE]: TextFilterProps[TextFilterProp.TYPE] =
    textFilterProps[TextFilterProp.TYPE].default;

  @property()
  [TextFilterProp.SUB_STR]: TextFilterProps[TextFilterProp.SUB_STR] =
    textFilterProps[TextFilterProp.SUB_STR].default;

  @property({ type: Number })
  [TextFilterProp.INDEX]: TextFilterProps[TextFilterProp.INDEX] =
    textFilterProps[TextFilterProp.INDEX].default;

  private handleTypeChanged(e: SelectChangedEvent<string>) {
    const type = e.detail.value as TextType;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type,
        subStr: this.subStr,
      }),
    );
  }

  private handleSubStrChanged(e: InputChangedEvent) {
    const subStr = e.detail.value;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type: this.type,
        subStr,
      }),
    );
  }

  private handleSubStrSubmitted(_e: InputChangedEvent) {
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  private handleButtonClicked() {
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  render() {
    return html`
      <fieldset>
        <ss-select
          selected=${this.type}
          @select-changed=${(e: SelectChangedEvent<string>) => {
            this.handleTypeChanged(e);
          }}
          .options=${Object.values(TextType).map(type => ({
            value: type,
            label: textTypeMsgMap[type],
          }))}
        ></ss-select>

        <ss-input
          value=${this.subStr}
          @input-changed=${(e: InputChangedEvent) => {
            this.handleSubStrChanged(e);
          }}
          @input-submitted=${(e: InputSubmittedEvent) => {
            this.handleSubStrSubmitted(e);
          }}
        ></ss-input>

        <ss-button
          text=${this.index === -1 ? '+' : '-'}
          @click=${this.handleButtonClicked}
        ></ss-button>
      </fieldset>
    `;
  }
}
