import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { formatDateTime } from '../util/time';
import { PointerDownEvent } from '@/events/pointer-down';
import { PointerUpEvent } from '@/events/pointer-up';
import { PointerLongPressEvent } from '@/events/pointer-long-press';
import { classMap } from 'lit/directives/class-map.js';

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
  @property() type: string = '';
  @property({ type: Number }) actionId: number = 0;
  @property() desc: string = '';
  @property() createdAt: string = '';
  @property() updatedAt: string = '';
  @property() occurredAt: string = '';
  @property({ type: Array }) tags: string[] = [];
  @property({ type: Boolean }) selected: boolean = false;

  @state() mode: ActionListItemMode = ActionListItemMode.VIEW;
  @state() pointerDown: Date = new Date();
  @state() downTimeout: number = 0;

  @state() get classes() {
    return { 'action-list-item': true, selected: this.selected };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('action-item-updated', e => {
      this.mode = ActionListItemMode.VIEW;
    });

    this.addEventListener('action-item-canceled', e => {
      this.mode = ActionListItemMode.VIEW;
    });
  }

  get readableTime() {
    const date = new Date(this.occurredAt);
    return formatDateTime(date);
  }

  setMode(mode: ActionListItemMode) {
    this.mode = mode;
  }

  private _handleMouseDown() {
    this.pointerDown = new Date();
    this.dispatchEvent(new PointerDownEvent({ time: this.pointerDown }));
    this.downTimeout = setTimeout(() => {
      const time = new Date();
      if (time.getTime() - this.pointerDown.getTime() > holdThreshold) {
        this.dispatchEvent(new PointerLongPressEvent({ time }));
        return;
      }
    }, holdThreshold);
  }

  private _handleMouseUp() {
    this.dispatchEvent(new PointerUpEvent({ time: new Date() }));
    if (this.downTimeout) {
      clearTimeout(this.downTimeout);
    }
    //this._setMode(ActionListItemMode.EDIT);
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${this.mode === ActionListItemMode.EDIT
          ? html`
              <action-form
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
              >
                <div class="desc">${this.desc}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `;
  }
}
