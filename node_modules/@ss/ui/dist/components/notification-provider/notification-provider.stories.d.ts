import type { StoryObj } from '@storybook/web-components';
import './notification-provider';
import { NotificationProviderProps } from './notification-provider.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        messageLife: number;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<NotificationProviderProps>> | undefined;
    render: (args: NotificationProviderProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<NotificationProviderProps>;
export declare const ThreeSeconds: Story;
