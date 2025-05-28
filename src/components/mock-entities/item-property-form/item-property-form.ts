import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ItemPropertyFormProp,
  itemPropertyFormProps,
  ItemPropertyFormProps,
} from './item-property-form.models';

import propertiesJson from 'api-spec/mock/properties';
import {
  ImageProperty,
  ItemProperty as ItemPropertyModel,
  PropertyConfig,
  RenderType,
} from '@/models/Entity';

const properties = propertiesJson as unknown as PropertyConfig[];

@customElement('item-property-form')
export class ItemPropertyForm extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
      }

      img {
        max-width: 100%;
      }
    `,
  ];

  @property({ type: Number })
  [ItemPropertyFormProp._ID]: ItemPropertyFormProps[ItemPropertyFormProp._ID] =
    itemPropertyFormProps[ItemPropertyFormProp._ID].default;

  @property({ type: Number })
  [ItemPropertyFormProp.PROPERTY_ID]: ItemPropertyFormProps[ItemPropertyFormProp.PROPERTY_ID] =
    itemPropertyFormProps[ItemPropertyFormProp.PROPERTY_ID].default;

  @property({ type: Object })
  [ItemPropertyFormProp.VALUE]: ItemPropertyFormProps[ItemPropertyFormProp.VALUE] =
    itemPropertyFormProps[ItemPropertyFormProp.VALUE].default;

  @state()
  get name(): string {
    return this.getPropertyName(this.propertyId);
  }

  @state()
  get propertyConfig(): PropertyConfig {
    return properties.find(
      property => property.id === this.propertyId,
    ) as PropertyConfig;
  }

  getPropertyName(id: number): string {
    const property = properties.find(property => property.id === id);
    return property ? property.name : '';
  }

  renderValue() {
    const renderHandlers: Record<RenderType, () => unknown> = {
      [RenderType.TEXT]: () => this.renderText(),
      [RenderType.IMAGE]: () => this.renderImage(),
    };

    const renderHandler = renderHandlers[this.propertyConfig.type];
    return renderHandler ? renderHandler() : nothing;
  }

  renderText() {
    const value = this.value as ItemPropertyModel['value'];

    return html`<span data-value=${JSON.stringify(value)} class="value">
      ${this.propertyConfig.prefix
        ? html`<span class="property-prefix"
            >${this.propertyConfig.prefix}</span
          >`
        : nothing}<span class="property-value">${value}</span>${this
        .propertyConfig.suffix
        ? html`<span class="property-suffix"
            >${this.propertyConfig.suffix}</span
          >`
        : nothing}
    </span>`;
  }

  renderImage() {
    const value = this.value as ImageProperty['value'];

    return html` <span data-value=${JSON.stringify(value)} class="value">
      <img src=${value.src} alt=${value.alt} />
    </span>`;
  }

  render() {
    return html`<div class="item-property">
      <span data-id=${this._id} class="id">${this._id}</span>
      <span data-name=${this.name} class="name">${this.name}</span>
      ${this.renderValue()}
    </div>`;
  }
}
