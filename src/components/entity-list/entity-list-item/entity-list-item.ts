import { html, css, nothing, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import {
  DataType,
  EntityConfig,
  EntityProperty,
  EntityPropertyConfig,
  ImageDataValue,
  PropertyDataValue,
} from 'api-spec/models/Entity';
import { Time } from '@/lib/Time';
import {
  EntityListItemMode,
  EntityListItemProp,
  entityListItemProps,
  EntityListItemProps,
} from './entity-list-item.models';
import { appState } from '@/state';

import { PointerDownEvent } from '@/events/pointer-down';
import { PointerUpEvent } from '@/events/pointer-up';
import { PointerLongPressEvent } from '@/events/pointer-long-press';

import '@/components/entity-form/entity-form';

const holdThreshold = 500;

@customElement('entity-list-item')
export class EntityListItem extends MobxLitElement {
  private state = appState;

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

    .property.image {
      img {
        max-width: 100%;
      }
    }
  `;
  @property({ type: Number })
  [EntityListItemProp.TYPE]: EntityListItemProps[EntityListItemProp.TYPE] =
    entityListItemProps[EntityListItemProp.TYPE].default;

  @property({ type: Number })
  [EntityListItemProp.ENTITY_ID]: EntityListItemProps[EntityListItemProp.ENTITY_ID] =
    entityListItemProps[EntityListItemProp.ENTITY_ID].default;

  @property()
  [EntityListItemProp.CREATED_AT]: EntityListItemProps[EntityListItemProp.CREATED_AT] =
    entityListItemProps[EntityListItemProp.CREATED_AT].default;

  @property()
  [EntityListItemProp.UPDATED_AT]: EntityListItemProps[EntityListItemProp.UPDATED_AT] =
    entityListItemProps[EntityListItemProp.UPDATED_AT].default;

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

  @state() get classes(): Record<string, boolean> {
    return { 'action-list-item': true, selected: this.selected };
  }

  @state()
  get entityConfig(): EntityConfig | undefined {
    return this.state.entityConfigs.find(entity => {
      return entity.id === this.type;
    });
  }

  @state()
  get propertyConfigs(): EntityPropertyConfig[] | undefined {
    if (!this.entityConfig) {
      return undefined;
    }

    return this.entityConfig.properties;
  }

  get readableTime(): string {
    const date = new Date(this.createdAt);
    return Time.formatDateTime(date);
  }

  getReadableTime(timeString: string): string {
    const date = new Date(timeString);
    return Time.formatDateTime(date);
  }

  setMode(mode: EntityListItemMode): void {
    this.mode = mode;
  }

  private handleMouseDown(e: Event): boolean {
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

  private handleMouseUp(e: Event): boolean {
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

  private handleTouchStart(e: TouchEvent): boolean {
    return true;
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

  private handleTouchEnd(e: Event): boolean {
    return true;
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

  private renderProperties(): (TemplateResult | typeof nothing)[] {
    return this.properties.map(property => {
      const propertyConfig = this.getPropertyConfig(property.propertyConfigId);
      if (!propertyConfig || propertyConfig.hidden) {
        return nothing;
      }

      let value: PropertyDataValue = propertyConfig.defaultValue;

      switch (propertyConfig.dataType) {
        case DataType.DATE:
          value = this.getReadableTime(property.value as string);
          break;
        case DataType.INT:
          value = property.value as number;
          break;
        default:
          value = property.value as string;
          break;
      }

      if (propertyConfig.dataType === DataType.IMAGE) {
        return this.renderImageProperty(property);
      }

      return html`
        <div class="property">
          <span>${propertyConfig.name}</span>
          ${propertyConfig.prefix
            ? html`<span class="property-prefix"
                >${propertyConfig.prefix}</span
              >`
            : nothing}<span class="property-value">${value}</span
          >${propertyConfig.suffix
            ? html`<span class="property-suffix"
                >${propertyConfig.suffix}</span
              >`
            : nothing}
        </div>
      `;
    });
  }

  renderImageProperty(
    property: EntityProperty,
  ): TemplateResult | typeof nothing {
    const propertyConfig = this.getPropertyConfig(property.propertyConfigId);
    if (!propertyConfig || propertyConfig.dataType !== DataType.IMAGE) {
      return nothing;
    }

    const value = property.value as ImageDataValue;

    return html` <span class="property image"
      ><img src=${value.src} alt=${value.alt}
    /></span>`;
  }

  getPropertyConfig(
    propertyConfigId: number,
  ): EntityPropertyConfig | undefined {
    if (!this.propertyConfigs) {
      return undefined;
    }

    return this.propertyConfigs.find(config => config.id === propertyConfigId);
  }

  render(): TemplateResult {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.mode === EntityListItemMode.EDIT
          ? html`
              <entity-form
                @entity-item-updated=${(): void => {
                  this.mode = EntityListItemMode.VIEW;
                }}
                @entity-item-canceled=${(): void => {
                  this.mode = EntityListItemMode.VIEW;
                }}
                entityId=${this.entityId}
                type=${this.type}
                .tags=${this.tags}
                .properties=${this.properties}
              ></entity-form>
            `
          : html`
              <div
                @mousedown=${this.handleMouseDown}
                @mouseup=${this.handleMouseUp}
                @touchstart=${this.handleTouchStart}
                @touchend=${this.handleTouchEnd}
              >
                <div class="properties">${this.renderProperties()}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `;
  }
}
