import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { Time } from '@/lib/Time';
import { PointerDownEvent } from '@/events/pointer-down';
import { PointerUpEvent } from '@/events/pointer-up';
import { PointerLongPressEvent } from '@/events/pointer-long-press';
import {
  ActionListItemProp,
  actionListItemProps,
  ActionListItemProps,
} from './action-list-item.models';

export enum ActionListItemMode {
  VIEW = 'view',
  EDIT = 'edit',
}

const holdThreshold = 500;

@customElement('action-list-item')
export class ActionListItem extends LitElement {
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
  `;
  @property()
  [ActionListItemProp.TYPE]: ActionListItemProps[ActionListItemProp.TYPE] =
    actionListItemProps[ActionListItemProp.TYPE].default;

  @property({ type: Number })
  [ActionListItemProp.ACTION_ID]: ActionListItemProps[ActionListItemProp.ACTION_ID] =
    actionListItemProps[ActionListItemProp.ACTION_ID].default;

  @property()
  [ActionListItemProp.DESC]: ActionListItemProps[ActionListItemProp.DESC] =
    actionListItemProps[ActionListItemProp.DESC].default;

  @property()
  [ActionListItemProp.CREATED_AT]: ActionListItemProps[ActionListItemProp.CREATED_AT] =
    actionListItemProps[ActionListItemProp.CREATED_AT].default;

  @property()
  [ActionListItemProp.UPDATED_AT]: ActionListItemProps[ActionListItemProp.UPDATED_AT] =
    actionListItemProps[ActionListItemProp.UPDATED_AT].default;

  @property()
  [ActionListItemProp.OCCURRED_AT]: ActionListItemProps[ActionListItemProp.OCCURRED_AT] =
    actionListItemProps[ActionListItemProp.OCCURRED_AT].default;

  @property({ type: Array })
  [ActionListItemProp.TAGS]: ActionListItemProps[ActionListItemProp.TAGS] =
    actionListItemProps[ActionListItemProp.TAGS].default;

  @property({ type: Boolean })
  [ActionListItemProp.SELECTED]: ActionListItemProps[ActionListItemProp.SELECTED] =
    actionListItemProps[ActionListItemProp.SELECTED].default;

  @property({ type: Array })
  [ActionListItemProp.PROPERTIES]: ActionListItemProps[ActionListItemProp.PROPERTIES] =
    actionListItemProps[ActionListItemProp.PROPERTIES].default;

  @state() mode: ActionListItemMode = ActionListItemMode.VIEW;
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

  setMode(mode: ActionListItemMode) {
    this.mode = mode;
  }

  private _handleMouseDown(e: Event) {
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

  private _handleMouseUp(e: Event) {
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

  private _handleTouchStart(e: TouchEvent) {
    return;
    console.log('touchstart');
    this.pointerDown = new Date();
    this.dispatchEvent(new PointerDownEvent({ time: this.pointerDown }));
    this.downTimeout = setTimeout(() => {
      console.log('in timeout');
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

  private _handleTouchEnd(e: Event) {
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

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.mode === ActionListItemMode.EDIT
          ? html`
              <action-form
                @action-item-updated=${() => {
                  this.mode = ActionListItemMode.VIEW;
                }}
                @action-item-canceled=${() => {
                  this.mode = ActionListItemMode.VIEW;
                }}
                actionId=${this.actionId}
                desc=${this.desc}
                occurredAt=${this.occurredAt}
                type=${this.type}
                .tags=${this.tags}
              ></action-form>
            `
          : html`
              <div
                @mousedown=${this._handleMouseDown}
                @mouseup=${this._handleMouseUp}
                @touchstart=${this._handleTouchStart}
                @touchend=${this._handleTouchEnd}
              >
                ${import.meta.env.APP_FF_PROPERTIES
                  ? html` <div class="properties">
                      ${this.properties.map(
                        property => html`
                          <div class="property">
                            <span>${property.name}</span>
                          </div>
                        `,
                      )}
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
