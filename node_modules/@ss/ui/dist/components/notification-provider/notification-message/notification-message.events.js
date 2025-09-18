export const notificationClickedEventName = 'notification-clicked';
export class NotificationClickedEvent extends CustomEvent {
    constructor(payload) {
        super(notificationClickedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=notification-message.events.js.map