var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e;
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from '../../../styles/theme';
import { NotificationMessageProp, notificationMessageProps, } from './notification-message.models';
import { NotificationClickedEvent } from './notification-message.events';
let NotificationMessage = class NotificationMessage extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = notificationMessageProps[NotificationMessageProp.NOTIFICATION_ID].default;
        this[_b] = notificationMessageProps[NotificationMessageProp.MESSAGE].default;
        this[_c] = notificationMessageProps[NotificationMessageProp.TYPE].default;
        this[_d] = notificationMessageProps[NotificationMessageProp.START_TIME].default;
        this[_e] = notificationMessageProps[NotificationMessageProp.MESSAGE_LIFE].default;
    }
    static { _a = NotificationMessageProp.NOTIFICATION_ID, _b = NotificationMessageProp.MESSAGE, _c = NotificationMessageProp.TYPE, _d = NotificationMessageProp.START_TIME, _e = NotificationMessageProp.MESSAGE_LIFE; }
    static { this.styles = [
        theme,
        css `
      .notification-message {
        position: relative;
        background-color: var(--color, #ddd);
        color: #333;
        text-align: center;
        padding: 0.25rem;
        animation: fade-out var(--message-life, 1000ms) linear forwards;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

        &.success {
          background-color: var(--color-success, #4caf50);
          color: #fff;
        }

        &.error {
          background-color: var(--color-error, #f44336);
          color: #fff;
        }

        &.info {
          background-color: var(--color-info, #2196f3);
          color: #fff;
        }

        .time-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.125),
            rgba(255, 255, 255, 0.25)
          );
          animation: time-elapsed var(--message-life, 1000ms) linear forwards;
        }

        .content {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 2;
        }
      }

      @keyframes time-elapsed {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `,
    ]; }
    get classes() {
        return {
            'notification-message': true,
            [this[NotificationMessageProp.TYPE]]: true,
        };
    }
    render() {
        return html `
      <div
        @click=${() => this.dispatchEvent(new NotificationClickedEvent({ id: this.notificationId }))}
        class=${classMap(this.classes)}
        style=${`--message-life: ${this[NotificationMessageProp.MESSAGE_LIFE]}ms`}
      >
        <div class="time-indicator"></div>
        <div class="content">
          ${this[NotificationMessageProp.MESSAGE]}
          <slot></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], NotificationMessage.prototype, _a, void 0);
__decorate([
    property()
], NotificationMessage.prototype, _b, void 0);
__decorate([
    property()
], NotificationMessage.prototype, _c, void 0);
__decorate([
    property({ type: Number })
], NotificationMessage.prototype, _d, void 0);
__decorate([
    property({ type: Number, reflect: true })
], NotificationMessage.prototype, _e, void 0);
NotificationMessage = __decorate([
    customElement('notification-message')
], NotificationMessage);
export { NotificationMessage };
//# sourceMappingURL=notification-message.js.map