import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import { DataType } from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import {
  PropertyChangedEvent,
  PropertyChangedEventPayload,
} from '../property-field/property-field.events';
import {
  TextFieldProp,
  TextFieldProps,
  textFieldProps,
} from './text-field.models';

@customElement('text-field')
export class TextField extends LitElement {
  @property({ type: Number })
  [TextFieldProp.INSTANCE_ID]: TextFieldProps[TextFieldProp.INSTANCE_ID] =
    textFieldProps[TextFieldProp.INSTANCE_ID].default;

  @property({ type: String })
  [TextFieldProp.VALUE]: TextFieldProps[TextFieldProp.VALUE] =
    textFieldProps[TextFieldProp.VALUE].default;

  @property({ type: Number })
  [TextFieldProp.PROPERTY_CONFIG_ID]: TextFieldProps[TextFieldProp.PROPERTY_CONFIG_ID] =
    textFieldProps[TextFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: Number })
  [TextFieldProp.ENTITY_CONFIG_ID]: TextFieldProps[TextFieldProp.ENTITY_CONFIG_ID] =
    textFieldProps[TextFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [TextFieldProp.UI_ID]: TextFieldProps[TextFieldProp.UI_ID] =
    textFieldProps[TextFieldProp.UI_ID].default;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = e.detail.value;

    const changedPayload: PropertyChangedEventPayload = {
      uiId: this[TextFieldProp.UI_ID],
      dataType: DataType.SHORT_TEXT,
      value,
    };

    console.log('TextField handleInputChanged:', changedPayload);
    const changedEvent = new PropertyChangedEvent(changedPayload);
    console.log('is this even fucking emitting', changedEvent);
    this.dispatchEvent(changedEvent);
  }

  render() {
    return html`
      <ss-input
        value=${this[TextFieldProp.VALUE]}
        @input-changed=${this.handleInputChanged}
      ></ss-input>
    `;
  }
}
