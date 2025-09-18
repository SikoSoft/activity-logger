export declare const notificationClickedEventName = "notification-clicked";
export interface NotificationClickedEventPayload {
    id: number;
}
export declare class NotificationClickedEvent extends CustomEvent<NotificationClickedEventPayload> {
    constructor(payload: NotificationClickedEventPayload);
}
