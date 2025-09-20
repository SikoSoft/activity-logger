import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { PropertyChangedEvent } from '../entity-form.events';
import { IntFieldProp, intFieldProps, IntFieldProps } from './int-field.models';
import { PropertyField } from '../property-field/property-field';

@customElement('int-field')
export class IntField extends PropertyField {
  @property({ type: Number })
  [IntFieldProp.INSTANCE_ID]: IntFieldProps[IntFieldProp.INSTANCE_ID] =
    intFieldProps[IntFieldProp.INSTANCE_ID].default;

  @property({ type: Number })
  [IntFieldProp.VALUE]: IntFieldProps[IntFieldProp.VALUE] =
    intFieldProps[IntFieldProp.VALUE].default;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = parseInt(e.detail.value);

    if (isNaN(value)) {
      return;
    }

    this.dispatchEvent(
      new PropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        instanceId: this[IntFieldProp.INSTANCE_ID],
        dataType: this.propertyConfig.dataType,
        value,
      }),
    );
  }

  render() {
    this.renderField = html`
      <ss-input
        type="number"
        value=${this[IntFieldProp.VALUE]}
        @input-changed=${this.handleInputChanged}
      ></ss-input>
    `;
    return super.render();
  }
}
