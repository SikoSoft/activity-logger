import type { StoryObj } from '@storybook/web-components';
import './notification-message';
import { NotificationMessageProps } from './notification-message.models';
import { NotificationType } from '../notification-provider.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        message: string;
        startTime: number;
        messageLife: number;
        type: NotificationType;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<NotificationMessageProps>> | undefined;
    render: (args: NotificationMessageProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<NotificationMessageProps>;
export declare const Info: Story;
