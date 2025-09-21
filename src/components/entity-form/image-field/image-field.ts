import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import { DataType, ImageDataValue } from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import {
  ImageFieldProp,
  ImageFieldProps,
  imageFieldProps,
} from './image-field.models';
import { PropertyChangedEvent } from '../property-field/property-field.events';

@customElement('image-field')
export class ImageField extends LitElement {
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

  @property({ type: Number })
  [ImageFieldProp.PROPERTY_CONFIG_ID]: ImageFieldProps[ImageFieldProp.PROPERTY_CONFIG_ID] =
    imageFieldProps[ImageFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: Number })
  [ImageFieldProp.ENTITY_CONFIG_ID]: ImageFieldProps[ImageFieldProp.ENTITY_CONFIG_ID] =
    imageFieldProps[ImageFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [ImageFieldProp.UI_ID]: ImageFieldProps[ImageFieldProp.UI_ID] =
    imageFieldProps[ImageFieldProp.UI_ID].default;

  protected handleValueChanged(value: ImageDataValue) {
    this.dispatchEvent(
      new PropertyChangedEvent({
        uiId: this[ImageFieldProp.UI_ID],
        dataType: DataType.IMAGE,
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
    return html`
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
  }
}
