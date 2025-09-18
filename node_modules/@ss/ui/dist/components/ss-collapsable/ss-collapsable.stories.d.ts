import type { StoryObj } from '@storybook/web-components';
import './ss-collapsable';
import { SSCollapsableProps } from './ss-collapsable.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        title: string;
        open: true;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSCollapsableProps>> | undefined;
    render: (args: SSCollapsableProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSCollapsableProps>;
export declare const Open: Story;
export declare const Closed: Story;
