import type { StoryObj } from '@storybook/web-components';
import './ss-toggle';
import { SSToggleProps } from './ss-toggle.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        on: boolean;
        highlightTime: number;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSToggleProps>> | undefined;
    render: (args: SSToggleProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSToggleProps>;
export declare const Off: Story;
export declare const On: Story;
