import type { StoryObj } from '@storybook/web-components';
import './ss-button';
import { SSButtonProps } from './ss-button.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        text: string;
        disabled: false;
        loading: false;
        positive: false;
        negative: false;
        class: string;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSButtonProps>> | undefined;
    render: (args: SSButtonProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSButtonProps>;
export declare const Disabled: Story;
export declare const Loading: Story;
export declare const Positive: Story;
export declare const Negative: Story;
