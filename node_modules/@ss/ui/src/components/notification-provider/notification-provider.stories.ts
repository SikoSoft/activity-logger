import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './notification-provider';
import {
  NotificationProviderProp,
  NotificationProviderProps,
  notificationProviderProps,
} from './notification-provider.models';
import { NotificationType } from './notification-provider.models';

const argTypes = StoryBook.buildArgTypes(notificationProviderProps);

const meta = {
  title: 'components/notification-provider',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    messageLife: notificationProviderProps.messageLife.default,
  },
  argTypes,
  render: args => html`
    <notification-provider
      messageLife=${args.messageLife}
    ></notification-provider>
  `,
} satisfies Meta<NotificationProviderProps>;

export default meta;
type Story = StoryObj<NotificationProviderProps>;

export const ThreeSeconds: Story = {
  args: {
    messageLife: 3000,
  },
};
