export const notificationClickedEventName = 'notification-clicked';

export interface NotificationClickedEventPayload {
  id: number;
}

export class NotificationClickedEvent extends CustomEvent<NotificationClickedEventPayload> {
  constructor(payload: NotificationClickedEventPayload) {
    super(notificationClickedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
