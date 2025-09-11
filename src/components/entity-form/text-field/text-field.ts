import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import { Entity } from 'api-spec/models';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';

@customElement('text-field')
export class TextField extends LitElement {
  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  render() {
    return html`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input></ss-input>
      </div>
    `;
  }
}
