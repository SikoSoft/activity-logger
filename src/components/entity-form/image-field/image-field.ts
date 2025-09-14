import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { ImagePropertyChangedEvent } from './image-field.events';
import {
  ImageFieldProp,
  ImageFieldProps,
  imageFieldProps,
} from './image-field.models';

@customElement('image-field')
export class ImageField extends LitElement {
  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  @property({ type: Object })
  [ImageFieldProp.VALUE]: ImageFieldProps[ImageFieldProp.VALUE] =
    imageFieldProps[ImageFieldProp.VALUE].default;

  protected handleInputChanged(e: InputChangedEvent) {
    this.dispatchEvent(
      new ImagePropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        value: this.value,
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
