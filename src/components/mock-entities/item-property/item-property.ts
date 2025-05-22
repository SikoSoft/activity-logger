import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { produce } from 'immer';
import {
  ItemPropertyProp,
  itemPropertyProps,
  ItemPropertyProps,
} from './item-property.models';

import entities from 'api-spec/mock/entities';
import itemsJson from 'api-spec/mock/items';
import propertiesJson from 'api-spec/mock/properties';
import { repeat } from 'lit/directives/repeat.js';
import {
  Item,
  ItemProperty as ItemPropertyModel,
  PropertyConfig,
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
      .paginator {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem;
      }

      .pages {
        display: flex;
        gap: 0.25rem;
      }

      .quick-page {
        color: #777;

        &.active {
          color: #000;
          font-weight: bold;
        }
      }

      button {
        cursor: pointer;
        border-radius: 8px;
        border: 1px #aaa solid;
        transition: all 0.2s;

        &:hover {
          background-color: #ccc;
        }
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  ];

  @property({ type: Number })
  [ItemPropertyProp._ID]: ItemPropertyProps[ItemPropertyProp._ID] =
    itemPropertyProps[ItemPropertyProp._ID].default;

  @property({ type: Array })
  [ItemPropertyProp.VALUE]: ItemPropertyProps[ItemPropertyProp.VALUE] =
    itemPropertyProps[ItemPropertyProp.VALUE].default;

  @state()
  get name(): string {
    return this.getPropertyName(this._id);
  }

  @state()
  get propertyConfig(): PropertyConfig {
    return properties.find(
      property => property.id === this._id,
    ) as PropertyConfig;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  getPropertyName(id: number): string {
    const property = properties.find(property => property.id === id);
    return property ? property.name : '';
  }

  render() {
    return html`<div class="item-property">
      <span data-id=${this._id} class="id">${this._id}</span>
      <span data-name=${this.name} class="name">${this.name}</span>
      ${repeat(
        this.value,
        (value, index) => index,
        (value, index) => html`
          <span data-value=${JSON.stringify(this.value[index])} class="value">
            ${this.propertyConfig.prefix
              ? html`<span class="property-prefix"
                  >${this.propertyConfig.prefix}</span
                >`
              : nothing}<span class="property-value">${this.value[index]}</span
            >${this.propertyConfig.suffix
              ? html`<span class="property-suffix"
                  >${this.propertyConfig.suffix}</span
                >`
              : nothing}
          </span>
        `,
      )}
    </div>`;
  }
}
