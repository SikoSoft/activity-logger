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
  DateFieldProp,
  DateFieldProps,
  dateFieldProps,
} from './date-field.models';

@customElement('date-field')
export class DateField extends LitElement {
  @property({ type: Number })
  [DateFieldProp.INSTANCE_ID]: DateFieldProps[DateFieldProp.INSTANCE_ID] =
    dateFieldProps[DateFieldProp.INSTANCE_ID].default;

  @property({ type: String })
  [DateFieldProp.VALUE]: DateFieldProps[DateFieldProp.VALUE] =
    dateFieldProps[DateFieldProp.VALUE].default;

  @property({ type: Number })
  [DateFieldProp.PROPERTY_CONFIG_ID]: DateFieldProps[DateFieldProp.PROPERTY_CONFIG_ID] =
    dateFieldProps[DateFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: Number })
  [DateFieldProp.ENTITY_CONFIG_ID]: DateFieldProps[DateFieldProp.ENTITY_CONFIG_ID] =
    dateFieldProps[DateFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [DateFieldProp.UI_ID]: DateFieldProps[DateFieldProp.UI_ID] =
    dateFieldProps[DateFieldProp.UI_ID].default;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = e.detail.value;

    const changedPayload: PropertyChangedEventPayload = {
      uiId: this[DateFieldProp.UI_ID],
      dataType: DataType.DATE,
      value,
    };

    const changedEvent = new PropertyChangedEvent(changedPayload);
    this.dispatchEvent(changedEvent);
  }

  render() {
    return html`
      <ss-input
        type="datetime-local"
        value=${this[DateFieldProp.VALUE]}
        @input-changed=${this.handleInputChanged}
      ></ss-input>
    `;
  }
}
