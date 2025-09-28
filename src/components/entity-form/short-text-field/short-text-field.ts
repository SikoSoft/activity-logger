import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import { DataType } from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import {
  PropertyChangedEvent,
  PropertyChangedEventPayload,
} from '@/components/entity-form/property-field/property-field.events';
import {
  ShortTextFieldProp,
  ShortTextFieldProps,
  shortTextFieldProps,
} from './short-text-field.models';

@customElement('short-text-field')
export class ShortTextField extends LitElement {
  @property({ type: Number })
  [ShortTextFieldProp.INSTANCE_ID]: ShortTextFieldProps[ShortTextFieldProp.INSTANCE_ID] =
    shortTextFieldProps[ShortTextFieldProp.INSTANCE_ID].default;

  @property({ type: String })
  [ShortTextFieldProp.VALUE]: ShortTextFieldProps[ShortTextFieldProp.VALUE] =
    shortTextFieldProps[ShortTextFieldProp.VALUE].default;

  @property({ type: Number })
  [ShortTextFieldProp.PROPERTY_CONFIG_ID]: ShortTextFieldProps[ShortTextFieldProp.PROPERTY_CONFIG_ID] =
    shortTextFieldProps[ShortTextFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: Number })
  [ShortTextFieldProp.ENTITY_CONFIG_ID]: ShortTextFieldProps[ShortTextFieldProp.ENTITY_CONFIG_ID] =
    shortTextFieldProps[ShortTextFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [ShortTextFieldProp.UI_ID]: ShortTextFieldProps[ShortTextFieldProp.UI_ID] =
    shortTextFieldProps[ShortTextFieldProp.UI_ID].default;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = e.detail.value;

    const changedPayload: PropertyChangedEventPayload = {
      uiId: this[ShortTextFieldProp.UI_ID],
      dataType: DataType.SHORT_TEXT,
      value,
    };

    const changedEvent = new PropertyChangedEvent(changedPayload);
    this.dispatchEvent(changedEvent);
  }

  render() {
    return html`
      <ss-input
        value=${this[ShortTextFieldProp.VALUE]}
        @input-changed=${this.handleInputChanged}
      ></ss-input>
    `;
  }
}
