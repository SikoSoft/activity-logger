import { theme } from '@/styles/theme';
import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  EntityItemProp,
  entityItemProps,
  EntityItemProps,
} from './entity-item.models';

import '@/components/mock-entities/item-property/item-property';

import { repeat } from 'lit/directives/repeat.js';
import { ActionListItemMode } from '@/components/action-list/action-list-item/action-list-item';

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

  @property({ type: Number })
  [EntityItemProp.TYPE]: EntityItemProps[EntityItemProp.TYPE] =
    entityItemProps[EntityItemProp.TYPE].default;

  @state() mode: ActionListItemMode = ActionListItemMode.VIEW;

  handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.mode = ActionListItemMode.EDIT;
  }

  render() {
    return html`<div class="entity-item">
      ${this.mode === ActionListItemMode.EDIT
        ? html`<action-form
            actionId=${this._id}
            type=${this.type}
            .properties=${this.properties}
          ></action-form>`
        : html`<div @mousedown=${this.handleMouseDown}>
            ${repeat(
              this.properties,
              property => property.id,
              property => html`
                (${property.propertyId})
                <item-property
                  _id=${property.id}
                  propertyId=${property.propertyId}
                  .value=${property.value}
                ></item-property>
              `,
            )}
          </div>`}
    </div>`;
  }
}
