import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  MockEntitiesProp,
  mockEntitiesProps,
  MockEntitiesProps,
} from './mock-entities.models';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-select';

import './entity-item/entity-item';

import entities from 'api-spec/mock/entities';
import itemsJson from 'api-spec/mock/items';
import properties from 'api-spec/mock/properties';

import { SelectChangedEvent } from '@ss/ui/events/select-changed';
import { repeat } from 'lit/directives/repeat.js';
import { Item } from '@/models/Entity';

const items = itemsJson as unknown as Item[];

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}

export interface InputObject {
  id: number;
  name: number;
  type?: InputType;
  value?: string | number | boolean;
}

export const textInputParams: Partial<InputObject> = {
  type: InputType.TEXT,
  value: '',
};

export const numberInputParams: Partial<InputObject> = {
  type: InputType.NUMBER,
  value: 0,
};

@customElement('mock-entities')
export class MockEntities extends LitElement {
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
  entityType: number = 0;

  @state()
  get listItems(): Item[] {
    return items.filter(item => item.type === this.entityType);
  }

  @state()
  get entityName(): string {
    const entity = entities.find(entity => entity.id === this.entityType);
    return entity ? entity.name : '';
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log({ entities, items, properties });

    this.entityType = entities[0].id;
  }

  handleTypeChanged(e: SelectChangedEvent<string>) {
    this.entityType = parseInt(e.detail.value);
  }

  getPropertyName(id: number): string {
    const property = properties.find(property => property.id === id);
    return property ? property.name : '';
  }

  render() {
    return html`<div class="mock-entities">
      Mock Entities

      <ss-select
        @select-changed=${this.handleTypeChanged}
        .options=${entities.map(entity => ({
          value: entity.id,
          label: entity.name,
        }))}
      >
      </ss-select>

      <h3>${this.entityName}</h3>

      ${repeat(
        this.listItems,
        item => item.id,
        item =>
          html`<entity-item
            _id=${item.id}
            type=${item.type}
            .properties=${item.properties}
          ></entity-item>`,
      )}
    </div>`;
  }
}
