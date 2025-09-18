import { NotificationType } from '../notification-provider.models';
export var NotificationMessageProp;
(function (NotificationMessageProp) {
    NotificationMessageProp["NOTIFICATION_ID"] = "notificationId";
    NotificationMessageProp["MESSAGE"] = "message";
    NotificationMessageProp["TYPE"] = "type";
    NotificationMessageProp["START_TIME"] = "startTime";
    NotificationMessageProp["MESSAGE_LIFE"] = "messageLife";
})(NotificationMessageProp || (NotificationMessageProp = {}));
export const notificationMessageProps = {
    [NotificationMessageProp.NOTIFICATION_ID]: {
        default: 0,
        control: 'number',
        description: 'The id of the notification',
    },
    [NotificationMessageProp.MESSAGE]: {
        default: '',
        control: 'text',
        description: 'The message to display',
    },
    [NotificationMessageProp.TYPE]: {
        default: NotificationType.INFO,
        control: 'text',
        description: 'The type of message to display',
    },
    [NotificationMessageProp.START_TIME]: {
        default: new Date().getTime(),
        control: 'number',
        description: 'The time the message was created',
    },
    [NotificationMessageProp.MESSAGE_LIFE]: {
        default: 5000,
        control: 'number',
        description: 'The time in milliseconds that a message will be displayed',
    },
};
//# sourceMappingURL=notification-message.models.js.map