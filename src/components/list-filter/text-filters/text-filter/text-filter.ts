import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TextType } from 'api-spec/models/List';
import {
  TextFilterProp,
  textFilterProps,
  TextFilterProps,
} from './text-filter.models';
import { translate } from '@/lib/Localization';

import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';
import {
  TextFilterUpdatedEvent,
  TextFilterSaveEvent,
} from './text-filter.events';
import {
  InputChangedEvent,
  InputSubmittedEvent,
} from '@ss/ui/components/ss-input.events';
import { themed } from '@/lib/Theme';

@themed()
@customElement('text-filter')
export class TextFilter extends LitElement {
  static styles = css`
    fieldset {
      border-color: var(--border-color);
    }
  `;

  @property()
  [TextFilterProp.TYPE]: TextFilterProps[TextFilterProp.TYPE] =
    textFilterProps[TextFilterProp.TYPE].default;

  @property()
  [TextFilterProp.SUB_STR]: TextFilterProps[TextFilterProp.SUB_STR] =
    textFilterProps[TextFilterProp.SUB_STR].default;

  @property({ type: Number })
  [TextFilterProp.INDEX]: TextFilterProps[TextFilterProp.INDEX] =
    textFilterProps[TextFilterProp.INDEX].default;

  private handleTypeChanged(e: SelectChangedEvent<string>): void {
    const type = e.detail.value as TextType;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type,
        subStr: this.subStr,
      }),
    );
  }

  private handleSubStrChanged(e: InputChangedEvent): void {
    const subStr = e.detail.value;
    this.dispatchEvent(
      new TextFilterUpdatedEvent({
        index: this.index,
        type: this.type,
        subStr,
      }),
    );
  }

  private handleSubStrSubmitted(_e: InputChangedEvent): void {
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  private handleButtonClicked(): void {
    this.dispatchEvent(new TextFilterSaveEvent({ index: this.index }));
  }

  render(): TemplateResult {
    return html`
      <fieldset>
        <ss-select
          selected=${this.type}
          @select-changed=${(e: SelectChangedEvent<string>): void => {
            this.handleTypeChanged(e);
          }}
          .options=${Object.values(TextType).map(type => ({
            value: type,
            label: translate(`textType.${type}`),
          }))}
        ></ss-select>

        <ss-input
          value=${this.subStr}
          @input-changed=${(e: InputChangedEvent): void => {
            this.handleSubStrChanged(e);
          }}
          @input-submitted=${(e: InputSubmittedEvent): void => {
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
