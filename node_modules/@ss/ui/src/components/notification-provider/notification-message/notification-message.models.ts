import { PropConfigMap, PropTypes } from '@/models/Prop';
import { NotificationType } from '../notification-provider.models';

export enum NotificationMessageProp {
  NOTIFICATION_ID = 'notificationId',
  MESSAGE = 'message',
  TYPE = 'type',
  START_TIME = 'startTime',
  MESSAGE_LIFE = 'messageLife',
}

export interface NotificationMessageProps extends PropTypes {
  [NotificationMessageProp.NOTIFICATION_ID]: number;
  [NotificationMessageProp.MESSAGE]: string;
  [NotificationMessageProp.TYPE]: NotificationType;
  [NotificationMessageProp.START_TIME]: number;
  [NotificationMessageProp.MESSAGE_LIFE]: number;
}

export const notificationMessageProps: PropConfigMap<NotificationMessageProps> =
  {
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
