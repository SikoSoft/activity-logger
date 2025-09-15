import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
  ImageDataValue,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import {
  ImageFieldProp,
  ImageFieldProps,
  imageFieldProps,
} from './image-field.models';
import { PropertyChangedEvent } from '../entity-form.events';

@customElement('image-field')
export class ImageField extends LitElement {
  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  @property({ type: Object })
  [ImageFieldProp.VALUE]: ImageFieldProps[ImageFieldProp.VALUE] =
    imageFieldProps[ImageFieldProp.VALUE].default;

  @state()
  src = '';

  @state()
  alt = '';

  protected handleValueChanged() {
    const value: ImageDataValue = {
      src: this.src,
      alt: this.alt,
    };

    this.dispatchEvent(
      new PropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        dataType: this.propertyConfig.dataType,
        value,
      }),
    );
  }

  protected handleSrcChanged(e: InputChangedEvent) {
    this.src = e.detail.value;
    this.handleValueChanged();
  }

  protected handleAltChanged(e: InputChangedEvent) {
    this.alt = e.detail.value;
    this.handleValueChanged();
  }

  render() {
    return html`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input
          type="text"
          placeholder="Image URL"
          @input-changed=${this.handleSrcChanged}
        ></ss-input>
        <ss-input
          type="text"
          placeholder="Image Alt Text"
          @input-changed=${this.handleAltChanged}
        ></ss-input>
      </div>
    `;
  }
}
