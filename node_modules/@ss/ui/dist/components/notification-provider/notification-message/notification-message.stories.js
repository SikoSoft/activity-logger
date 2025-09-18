import { html } from 'lit';
import { StoryBook } from '../../../lib/StoryBook';
import './notification-message';
import { notificationMessageProps, } from './notification-message.models';
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
    render: args => html `
    <notification-message
      message=${args.message}
      startTime=${args.startTime}
      messageLife=${args.messageLife}
      type=${args.type}
    ></notification-message>
  `,
};
export default meta;
export const Info = {
    args: {
        type: NotificationType.INFO,
    },
};
//# sourceMappingURL=notification-message.stories.js.map