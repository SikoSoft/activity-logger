import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './notification-provider';
import { notificationProviderProps, } from './notification-provider.models';
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
    render: args => html `
    <notification-provider
      messageLife=${args.messageLife}
    ></notification-provider>
  `,
};
export default meta;
export const ThreeSeconds = {
    args: {
        messageLife: 3000,
    },
};
//# sourceMappingURL=notification-provider.stories.js.map