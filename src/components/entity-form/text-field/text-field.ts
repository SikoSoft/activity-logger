import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { PropertyChangedEvent } from '../entity-form.events';
import {
  TextFieldProp,
  TextFieldProps,
  textFieldProps,
} from './text-field.models';
import { PropertyField } from '../property-field/property-field';

@customElement('text-field')
export class TextField extends PropertyField {
  @property({ type: Number })
  [TextFieldProp.INSTANCE_ID]: TextFieldProps[TextFieldProp.INSTANCE_ID] =
    textFieldProps[TextFieldProp.INSTANCE_ID].default;

  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  @property({ type: String })
  [TextFieldProp.VALUE]: TextFieldProps[TextFieldProp.VALUE] =
    textFieldProps[TextFieldProp.VALUE].default;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = e.detail.value;

    this.dispatchEvent(
      new PropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        instanceId: this[TextFieldProp.INSTANCE_ID],
        dataType: this.propertyConfig.dataType,
        value,
      }),
    );
  }

  render() {
    this.renderField = html`
      <ss-input
        value=${this[TextFieldProp.VALUE]}
        @input-changed=${this.handleInputChanged}
      ></ss-input>
    `;
    return super.render();
  }
}
