import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum NotificationProviderProp {
  MESSAGE_LIFE = 'messageLife',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface NotificationProviderProps extends PropTypes {
  [NotificationProviderProp.MESSAGE_LIFE]: number;
  [NotificationProviderProp.TOP]: boolean;
  [NotificationProviderProp.BOTTOM]: boolean;
}

export const notificationProviderProps: PropConfigMap<NotificationProviderProps> =
  {
    [NotificationProviderProp.MESSAGE_LIFE]: {
      default: 5000,
      control: 'number',
      description: 'The time in milliseconds that a message will be displayed',
    },
    [NotificationProviderProp.TOP]: {
      default: false,
      control: 'boolean',
      description:
        'Whether the notification provider is at the top of the screen',
    },
    [NotificationProviderProp.BOTTOM]: {
      default: false,
      control: 'boolean',
      description:
        'Whether the notification provider is at the bottom of the screen',
    },
  };

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  startTime: Date;
  messageLife: number;
}

export enum NotificationSide {
  TOP = 'top',
  BOTTOM = 'bottom',
}
