import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../../lib/StoryBook';

import './notification-message';
import {
  NotificationMessageProp,
  NotificationMessageProps,
  notificationMessageProps,
} from './notification-message.models';
import { NotificationType } from '../notification-provider.models';

const argTypes = StoryBook.buildArgTypes(notificationMessageProps);

const meta = {
  title: 'components/notification-provider/notification-message',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    message: notificationMessageProps.message.default,
    startTime: notificationMessageProps.startTime.default,
    messageLife: notificationMessageProps.messageLife.default,
    type: notificationMessageProps.type.default,
  },
  argTypes,
  render: args => html`
    <notification-message
      message=${args.message}
      startTime=${args.startTime}
      messageLife=${args.messageLife}
      type=${args.type}
    ></notification-message>
  `,
} satisfies Meta<NotificationMessageProps>;

export default meta;
type Story = StoryObj<NotificationMessageProps>;

export const Info: Story = {
  args: {
    type: NotificationType.INFO,
  },
};
