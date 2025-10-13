import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import { DataType } from 'api-spec/models/Entity';
import {
  PropertyChangedEvent,
  PropertyChangedEventPayload,
} from '@/components/entity-form/property-field/property-field.events';
import {
  LongTextFieldProp,
  LongTextFieldProps,
  longTextFieldProps,
} from './long-text-field.models';
import { theme } from '@/styles/theme';

@customElement('long-text-field')
export class LongTextField extends LitElement {
  static styles = [
    theme,
    css`
      textarea {
        width: 100%;
        height: 100px;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: var(--padding);
        font-size: var(--font-size);
        color: var(--text-color);
        background-color: var(--background-color);
        box-sizing: border-box;
      }

      textarea:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    `,
  ];

  @property({ type: Number })
  [LongTextFieldProp.INSTANCE_ID]: LongTextFieldProps[LongTextFieldProp.INSTANCE_ID] =
    longTextFieldProps[LongTextFieldProp.INSTANCE_ID].default;

  @property({ type: String })
  [LongTextFieldProp.VALUE]: LongTextFieldProps[LongTextFieldProp.VALUE] =
    longTextFieldProps[LongTextFieldProp.VALUE].default;

  @property({ type: Number })
  [LongTextFieldProp.PROPERTY_CONFIG_ID]: LongTextFieldProps[LongTextFieldProp.PROPERTY_CONFIG_ID] =
    longTextFieldProps[LongTextFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: Number })
  [LongTextFieldProp.ENTITY_CONFIG_ID]: LongTextFieldProps[LongTextFieldProp.ENTITY_CONFIG_ID] =
    longTextFieldProps[LongTextFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [LongTextFieldProp.UI_ID]: LongTextFieldProps[LongTextFieldProp.UI_ID] =
    longTextFieldProps[LongTextFieldProp.UI_ID].default;

  @query('textarea')
  textareaElement: HTMLTextAreaElement | undefined;

  protected handleInputChanged(): void {
    if (!this.textareaElement) {
      return;
    }

    const value = this.textareaElement.value;

    const changedPayload: PropertyChangedEventPayload = {
      uiId: this[LongTextFieldProp.UI_ID],
      dataType: DataType.LONG_TEXT,
      value,
    };

    const changedEvent = new PropertyChangedEvent(changedPayload);
    this.dispatchEvent(changedEvent);
  }

  render(): TemplateResult {
    return html`
      <textarea
        @input=${this.handleInputChanged}
        .value=${this[LongTextFieldProp.VALUE]}
      ></textarea>
    `;
  }
}
