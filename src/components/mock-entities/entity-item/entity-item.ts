import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { produce } from 'immer';
import {
  EntityItemProp,
  entityItemProps,
  EntityItemProps,
} from './entity-item.models';

import '@/components/mock-entities/item-property/item-property';

import entities from 'api-spec/mock/entities';
import itemsJson from 'api-spec/mock/items';
import properties from 'api-spec/mock/properties';
import { repeat } from 'lit/directives/repeat.js';
import { Item, ItemProperty as ItemPropertyModel } from '@/models/Entity';

@customElement('entity-item')
export class EntityItem extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
      }

      .entity-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid #aaa;
        background-color: #f9f9f9;
      }
    `,
  ];

  @property({ type: Number })
  [EntityItemProp._ID]: EntityItemProps[EntityItemProp._ID] =
    entityItemProps[EntityItemProp._ID].default;

  @property({ type: Array })
  [EntityItemProp.PROPERTIES]: EntityItemProps[EntityItemProp.PROPERTIES] =
    entityItemProps[EntityItemProp.PROPERTIES].default;

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {}

  render() {
    return html`<div class="entity-item">
      ${repeat(
        this.properties,
        property => property.id,
        property => html`
          <item-property
            _id=${property.id}
            .value=${property.value}
          ></item-property>
        `,
      )}
    </div>`;
  }
}
