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

@customElement('text-field')
export class TextField extends LitElement {
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
        dataType: this.propertyConfig.dataType,
        value,
      }),
    );
  }

  render() {
    return html`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input
          value=${this[TextFieldProp.VALUE]}
          @input-changed=${this.handleInputChanged}
        ></ss-input>
      </div>
    `;
  }
}
