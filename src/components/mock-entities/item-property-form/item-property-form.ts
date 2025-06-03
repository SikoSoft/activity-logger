import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
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
  TextProperty,
} from '@/models/Entity';

import '@ss/ui/components/ss-input';
import { msg } from '@lit/localize';

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
  get propertyConfig(): PropertyConfig {
    return properties.find(
      property => property.id === this.propertyId,
    ) as PropertyConfig;
  }

  @state()
  get typedValue(): ItemPropertyModel['value'] {
    switch (this.propertyConfig.renderType) {
      case RenderType.IMAGE:
        return this.value as ImageProperty['value'];
      case RenderType.TEXT:
      case RenderType.NUMBER:
        return this.value as TextProperty['value'];
      default:
        return '';
    }
  }

  renderControl() {
    const renderHandlers: Record<RenderType, () => unknown> = {
      [RenderType.NUMBER]: () => this.renderText(),
      [RenderType.TEXT]: () => this.renderText(),
      [RenderType.IMAGE]: () => this.renderImage(),
    };

    const renderHandler = renderHandlers[this.propertyConfig.renderType];
    return renderHandler ? renderHandler() : nothing;
  }

  renderText(): TemplateResult {
    const value = this.value as TextProperty['value'];

    return html` <ss-input
      placeholder=${this.propertyConfig.name}
      value=${value}
    ></ss-input>`;
  }

  renderImage(): TemplateResult {
    const value = this.value as ImageProperty['value'];

    return html`
      <ss-input placeholder=${msg('src')} value=${value.src}></ss-input>
      <ss-input placeholder=${msg('alt')} value=${value.alt}></ss-input>
    `;
  }

  render() {
    console.log('render item-property-form', this.propertyConfig);

    return html`<div class="item-property">${this.renderControl()}</div>`;
  }
}
