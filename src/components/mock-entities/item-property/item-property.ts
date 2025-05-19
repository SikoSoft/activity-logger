import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ItemPropertyProp,
  itemPropertyProps,
  ItemPropertyProps,
} from './item-property.models';

import entities from 'api-spec/mock/entities';
import itemsJson from 'api-spec/mock/items';
import properties from 'api-spec/mock/properties';
import { repeat } from 'lit/directives/repeat.js';
import { Item, ItemProperty as ItemPropertyModel } from '@/models/Entity';

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

  @state()
  data: ItemPropertyModel = {
    id: 0,
    value: [],
  };

  get name(): string {
    return this.getPropertyName(this.data.id);
  }

  connectedCallback(): void {
    super.connectedCallback();
    //    console.log({ entities, items, properties });

    //  this.entityType = entities[0].id;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const suggestionsSlotNode = this.shadowRoot?.querySelector(
      'slot[name="suggestions"]',
    );
    if (suggestionsSlotNode) {
      suggestionsSlotNode.addEventListener('slotchange', () => {
        this.syncFromSlot();
      });
    }

    this.syncFromSlot();
  }

  syncFromSlot() {
    console.log('syncFromSlot');
    const xml = this.querySelector('xml');

    // console.log('xml', xml);

    if (xml) {
      const propertyNode = xml.querySelector('property');
      //console.log('property', propertyNode);
      const idNodes = propertyNode?.getElementsByTagName('id');
      // console.log('idNodes', idNodes);

      this.data.id = parseInt(idNodes?.[0]?.textContent || '0');
      console.log('this.data.id', this.data.id);
    }
  }

  getPropertyName(id: number): string {
    const property = properties.find(property => property.id === id);
    return property ? property.name : '';
  }

  render() {
    return html`<div class="item-property">
      <span data-id=${this.data.id} class="id">${this.data.id}</span>
      <span data-id=${this.name} class="name">${this.name}</span>
    </div>`;
  }
}
