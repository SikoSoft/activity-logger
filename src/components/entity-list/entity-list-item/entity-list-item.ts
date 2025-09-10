import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { Time } from '@/lib/Time';
import {
  EntityListItemProp,
  entityListItemProps,
  EntityListItemProps,
} from './entity-list-item.models';

import { PointerDownEvent } from '@/events/pointer-down';
import { PointerUpEvent } from '@/events/pointer-up';
import { PointerLongPressEvent } from '@/events/pointer-long-press';

import {
  Property,
  PropertyConfig,
  propertyConfigById,
  PropertyDataType,
  PropertyRenderType,
} from '@/mock/entity-config';

export enum EntityListItemMode {
  VIEW = 'view',
  EDIT = 'edit',
}

const holdThreshold = 500;

@customElement('entity-list-item')
export class EntityListItem extends LitElement {
  static styles = css`
    .action-list-item {
      padding: 0.5rem;
      text-align: center;
      transition: all 0.2s;

      &.selected {
        background-color: #fdc;
      }
    }

    .time {
      color: #888;
      font-size: 0.9rem;
    }

    .properties {
      background-color: #ffeed0;
    }
  `;
  @property()
  [EntityListItemProp.TYPE]: EntityListItemProps[EntityListItemProp.TYPE] =
    entityListItemProps[EntityListItemProp.TYPE].default;

  @property({ type: Number })
  [EntityListItemProp.ENTITY_ID]: EntityListItemProps[EntityListItemProp.ENTITY_ID] =
    entityListItemProps[EntityListItemProp.ENTITY_ID].default;

  @property()
  [EntityListItemProp.DESC]: EntityListItemProps[EntityListItemProp.DESC] =
    entityListItemProps[EntityListItemProp.DESC].default;

  @property()
  [EntityListItemProp.CREATED_AT]: EntityListItemProps[EntityListItemProp.CREATED_AT] =
    entityListItemProps[EntityListItemProp.CREATED_AT].default;

  @property()
  [EntityListItemProp.UPDATED_AT]: EntityListItemProps[EntityListItemProp.UPDATED_AT] =
    entityListItemProps[EntityListItemProp.UPDATED_AT].default;

  @property()
  [EntityListItemProp.OCCURRED_AT]: EntityListItemProps[EntityListItemProp.OCCURRED_AT] =
    entityListItemProps[EntityListItemProp.OCCURRED_AT].default;

  @property({ type: Array })
  [EntityListItemProp.TAGS]: EntityListItemProps[EntityListItemProp.TAGS] =
    entityListItemProps[EntityListItemProp.TAGS].default;

  @property({ type: Boolean })
  [EntityListItemProp.SELECTED]: EntityListItemProps[EntityListItemProp.SELECTED] =
    entityListItemProps[EntityListItemProp.SELECTED].default;

  @property({ type: Array })
  [EntityListItemProp.PROPERTIES]: EntityListItemProps[EntityListItemProp.PROPERTIES] =
    entityListItemProps[EntityListItemProp.PROPERTIES].default;

  @property({ type: Boolean })
  [EntityListItemProp.DEBUG]: EntityListItemProps[EntityListItemProp.DEBUG] =
    entityListItemProps[EntityListItemProp.DEBUG].default;

  @state() mode: EntityListItemMode = EntityListItemMode.VIEW;
  @state() pointerDown: Date = new Date();
  @state() downTimeout: number = 0;
  @state() downActivation: boolean = false;

  @state() get classes() {
    return { 'action-list-item': true, selected: this.selected };
  }

  get readableTime() {
    const date = new Date(this.occurredAt);
    return Time.formatDateTime(date);
  }

  setMode(mode: EntityListItemMode) {
    this.mode = mode;
  }

  private handleMouseDown(e: Event) {
    this.pointerDown = new Date();
    this.dispatchEvent(new PointerDownEvent({ time: this.pointerDown }));
    this.downTimeout = setTimeout(() => {
      const time = new Date();
      if (time.getTime() - this.pointerDown.getTime() > holdThreshold) {
        this.dispatchEvent(new PointerLongPressEvent({ time }));
        this.downActivation = true;
        return;
      }
    }, holdThreshold);
    e.preventDefault();
    return false;
  }

  private handleMouseUp(e: Event) {
    if (!this.downActivation) {
      this.dispatchEvent(new PointerUpEvent({ time: new Date() }));
    }
    this.downActivation = false;
    if (this.downTimeout) {
      clearTimeout(this.downTimeout);
    }

    e.preventDefault();
    return false;
  }

  private handleTouchStart(e: TouchEvent) {
    return;
    this.pointerDown = new Date();
    this.dispatchEvent(new PointerDownEvent({ time: this.pointerDown }));
    this.downTimeout = setTimeout(() => {
      const time = new Date();
      if (time.getTime() - this.pointerDown.getTime() > holdThreshold) {
        this.dispatchEvent(new PointerLongPressEvent({ time }));
        this.downActivation = true;
        return;
      }
    }, holdThreshold);
    e.preventDefault();
    return false;
  }

  private handleTouchEnd(e: Event) {
    return;
    if (!this.downActivation) {
      this.dispatchEvent(new PointerUpEvent({ time: new Date() }));
    }
    this.downActivation = false;
    if (this.downTimeout) {
      clearTimeout(this.downTimeout);
    }

    e.preventDefault();
    return false;
  }

  private renderProperties() {
    return this.properties.map(property => {
      const propertyConfig = propertyConfigById(property.propertyId);
      if (!propertyConfig || propertyConfig.renderType === 'hidden') {
        return nothing;
      }

      let value: PropertyConfig['defaultValue'] = propertyConfig.defaultValue;

      switch (propertyConfig.dataType) {
        case PropertyDataType.NUMBER:
          value = property.value as number;
          break;
        default:
          value = property.value as string;
          break;
      }

      if (propertyConfig.renderType === PropertyRenderType.IMAGE) {
        return this.renderImageProperty(property);
      }

      return html`
        <div class="property">
          <span>${propertyConfig.name}</span>
          ${propertyConfig.valuePrefix
            ? html`<span class="property-prefix"
                >${propertyConfig.valuePrefix}</span
              >`
            : nothing}<span class="property-value">${value}</span
          >${propertyConfig.valueSuffix
            ? html`<span class="property-suffix"
                >${propertyConfig.valueSuffix}</span
              >`
            : nothing}
        </div>
      `;
    });
  }

  renderImageProperty(property: Property) {
    return html` <span class="property image"
      ><img src=${property.value}
    /></span>`;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.mode === EntityListItemMode.EDIT
          ? html`
              <action-form
                @action-item-updated=${() => {
                  this.mode = EntityListItemMode.VIEW;
                }}
                @action-item-canceled=${() => {
                  this.mode = EntityListItemMode.VIEW;
                }}
                entityId=${this.entityId}
                desc=${this.desc}
                occurredAt=${this.occurredAt}
                type=${this.type}
                .tags=${this.tags}
              ></action-form>
            `
          : html`
              <div
                @mousedown=${this.handleMouseDown}
                @mouseup=${this.handleMouseUp}
                @touchstart=${this.handleTouchStart}
                @touchend=${this.handleTouchEnd}
              >
                ${import.meta.env.APP_FF_PROPERTIES && this.debug
                  ? html` <div class="properties">
                      ${this.renderProperties()}
                    </div>`
                  : nothing}

                <div class="desc">${this.desc}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `;
  }
}
