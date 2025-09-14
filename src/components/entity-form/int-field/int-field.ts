import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { PropertyChangedEvent } from '../entity-form.events';

@customElement('int-field')
export class IntField extends LitElement {
  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  protected handleInputChanged(e: InputChangedEvent) {
    const value = parseInt(e.detail.value);

    if (isNaN(value)) {
      return;
    }

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
          type="number"
          @input-changed=${this.handleInputChanged}
        ></ss-input>
      </div>
    `;
  }
}
