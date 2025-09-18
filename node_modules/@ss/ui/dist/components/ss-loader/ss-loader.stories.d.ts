import type { StoryObj } from '@storybook/web-components';
import './ss-loader';
import { SSLoaderProps } from './ss-loader.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        padded: false;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSLoaderProps>> | undefined;
    render: (args: SSLoaderProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSLoaderProps>;
export declare const Padded: Story;
