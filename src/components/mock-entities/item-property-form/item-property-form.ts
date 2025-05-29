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

import '@ss/ui/components/ss-input';

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

  render() {
    return html`<div class="item-property">
      <ss-input placeholder=${this.propertyConfig.name}></ss-input>
    </div>`;
  }
}
