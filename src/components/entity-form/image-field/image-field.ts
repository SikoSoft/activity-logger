import { html } from 'lit';
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
import { PropertyField } from '../property-field/property-field';

@customElement('image-field')
export class ImageField extends PropertyField {
  @property({ type: Number })
  [ImageFieldProp.INSTANCE_ID]: ImageFieldProps[ImageFieldProp.INSTANCE_ID] =
    imageFieldProps[ImageFieldProp.INSTANCE_ID].default;

  @property({ type: Object })
  [ImageFieldProp.VALUE]: ImageFieldProps[ImageFieldProp.VALUE] =
    imageFieldProps[ImageFieldProp.VALUE].default;

  @property({ type: String })
  [ImageFieldProp.SRC]: ImageFieldProps[ImageFieldProp.SRC] =
    imageFieldProps[ImageFieldProp.SRC].default;

  @property({ type: String })
  [ImageFieldProp.ALT]: ImageFieldProps[ImageFieldProp.ALT] =
    imageFieldProps[ImageFieldProp.ALT].default;

  protected handleValueChanged(value: ImageDataValue) {
    this.dispatchEvent(
      new PropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        instanceId: this[ImageFieldProp.INSTANCE_ID],
        dataType: this.propertyConfig.dataType,
        value,
      }),
    );
  }

  protected handleSrcChanged(e: InputChangedEvent) {
    this.handleValueChanged({ src: e.detail.value, alt: this.alt });
  }

  protected handleAltChanged(e: InputChangedEvent) {
    this.handleValueChanged({ src: this.src, alt: e.detail.value });
  }

  render() {
    this.renderField = html`
      <ss-input
        type="text"
        value=${this.src}
        placeholder="Image URL"
        @input-changed=${this.handleSrcChanged}
      ></ss-input>

      <ss-input
        type="text"
        value=${this.alt}
        placeholder="Image Alt Text"
        @input-changed=${this.handleAltChanged}
      ></ss-input>
    `;
    return super.render();
  }
}
