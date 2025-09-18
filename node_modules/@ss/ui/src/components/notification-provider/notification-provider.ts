import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

import { theme } from '../../styles/theme';
import {
  NotificationProviderProp,
  NotificationProviderProps,
  Notification,
  notificationProviderProps,
  NotificationType,
  NotificationSide,
} from './notification-provider.models';

import './notification-message/notification-message';

@customElement('notification-provider')
export class NotificationProvider extends LitElement {
  notificationId = 0;

  @state()
  notifications: Notification[] = [];

  public static styles = [
    theme,
    css`
      .notification-provider {
        position: fixed;
        left: 10vw;
        width: 80vw;
        z-index: 1000;

        &.top {
          top: 0;
        }

        &.bottom {
          bottom: 0;
        }
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  [NotificationProviderProp.MESSAGE_LIFE]: NotificationProviderProps[NotificationProviderProp.MESSAGE_LIFE] =
    notificationProviderProps[NotificationProviderProp.MESSAGE_LIFE].default;

  @property({ type: Boolean })
  [NotificationProviderProp.TOP]: NotificationProviderProps[NotificationProviderProp.TOP] =
    notificationProviderProps[NotificationProviderProp.TOP].default;

  @property({ type: Boolean })
  [NotificationProviderProp.BOTTOM]: NotificationProviderProps[NotificationProviderProp.BOTTOM] =
    notificationProviderProps[NotificationProviderProp.BOTTOM].default;

  @state()
  get classes(): Record<string, boolean> {
    return {
      'notification-provider': true,
      top: this.side === NotificationSide.TOP,
      bottom: this.side === NotificationSide.BOTTOM,
    };
  }

  @state()
  get side(): NotificationSide {
    if (this[NotificationProviderProp.TOP]) {
      return NotificationSide.TOP;
    }

    return NotificationSide.BOTTOM;
  }

  addNotification(message: string, type: NotificationType): number {
    const id = this.notificationId++;
    const notification: Notification = {
      id,
      message,
      type,
      startTime: new Date(),
      messageLife: this[NotificationProviderProp.MESSAGE_LIFE],
    };

    this.notifications = [...this.notifications, notification];

    setTimeout(() => {
      this.removeNotification(id);
    }, this[NotificationProviderProp.MESSAGE_LIFE]);

    return id;
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${repeat(
          this.notifications,
          n => n.id,
          n => {
            return html` <notification-message
              @notification-clicked=${() => this.removeNotification(n.id)}
              message=${n.message}
              type=${n.type}
              startTime=${n.startTime.getTime()}
              messageLife=${n.messageLife}
            ></notification-message>`;
          },
        )}
      </div>
    `;
  }
}
