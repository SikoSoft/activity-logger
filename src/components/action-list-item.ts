import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { ActionItem } from '../models/Action';
import { dateTime } from '../util/time';

export enum ActionListItemMode {
  VIEW = 'view',
  EDIT = 'edit',
}

@customElement('action-list-item')
export class ActionListItem extends LitElement {
  static styles = css`
    .action-list-item {
      padding: 0.5rem;
      text-align: center;
    }

    .time {
      color: #888;
      font-size: 0.9rem;
    }
  `;
  @property() type: string = '';
  @property({ type: Number }) actionId: number = 0;
  @property() desc: string = '';
  @property({ type: Number }) time: number = 0;

  @state() mode: ActionListItemMode = ActionListItemMode.VIEW;

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
    return dateTime(this.time);
  }

  private _setMode(mode: ActionListItemMode) {
    this.mode = mode;
  }

  render() {
    return html`
      <div class="action-list-item">
        ${this.mode === ActionListItemMode.EDIT
          ? html`
              <action-form
                actionId=${this.actionId}
                desc=${this.desc}
                time=${dateTime(this.time)}
                type=${this.type}
              ></action-form>
            `
          : html`
              <div
                @click="${() => {
                  this._setMode(ActionListItemMode.EDIT);
                }}"
              >
                <div class="desc">${this.desc}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `;
  }
}
