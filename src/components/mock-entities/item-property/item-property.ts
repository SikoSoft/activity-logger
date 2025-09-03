import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ItemPropertyProp,
  itemPropertyProps,
  ItemPropertyProps,
} from './item-property.models';

import propertiesJson from 'api-spec/mock/properties';
import {
  ImageProperty,
  ItemProperty as ItemPropertyModel,
  PropertyConfig,
  RenderType,
} from '@/models/Entity';

const properties = propertiesJson as unknown as PropertyConfig[];

@customElement('item-property')
export class ItemProperty extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
      }

      .id,
      .name {
        display: none;
      }

      img {
        max-width: 100%;
      }
    `,
  ];

  @property({ type: Number })
  [ItemPropertyProp._ID]: ItemPropertyProps[ItemPropertyProp._ID] =
    itemPropertyProps[ItemPropertyProp._ID].default;

  @property({ type: Number })
  [ItemPropertyProp.PROPERTY_ID]: ItemPropertyProps[ItemPropertyProp.PROPERTY_ID] =
    itemPropertyProps[ItemPropertyProp.PROPERTY_ID].default;

  @property({ type: Object })
  [ItemPropertyProp.VALUE]: ItemPropertyProps[ItemPropertyProp.VALUE] =
    itemPropertyProps[ItemPropertyProp.VALUE].default;

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
      [RenderType.NUMBER]: () => this.renderText(),
      [RenderType.TEXT]: () => this.renderText(),
      [RenderType.IMAGE]: () => this.renderImage(),
      [RenderType.HIDDEN]: () => nothing,
    };

    const renderHandler = renderHandlers[this.propertyConfig.renderType];
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
    if (!this.propertyConfig) {
      console.warn(
        `Property with ID ${this.propertyId} not found in properties.`,
      );
      return nothing;
    }

    return html`<div class="item-property">
      <span data-id=${this._id} class="id">${this._id}</span>
      <span data-name=${this.name} class="name">${this.name}</span>
      ${this.renderValue()}
    </div>`;
  }
}
