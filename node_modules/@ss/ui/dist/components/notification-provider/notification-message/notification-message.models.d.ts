import { PropConfigMap, PropTypes } from '@/models/Prop';
import { NotificationType } from '../notification-provider.models';
export declare enum NotificationMessageProp {
    NOTIFICATION_ID = "notificationId",
    MESSAGE = "message",
    TYPE = "type",
    START_TIME = "startTime",
    MESSAGE_LIFE = "messageLife"
}
export interface NotificationMessageProps extends PropTypes {
    [NotificationMessageProp.NOTIFICATION_ID]: number;
    [NotificationMessageProp.MESSAGE]: string;
    [NotificationMessageProp.TYPE]: NotificationType;
    [NotificationMessageProp.START_TIME]: number;
    [NotificationMessageProp.MESSAGE_LIFE]: number;
}
export declare const notificationMessageProps: PropConfigMap<NotificationMessageProps>;
