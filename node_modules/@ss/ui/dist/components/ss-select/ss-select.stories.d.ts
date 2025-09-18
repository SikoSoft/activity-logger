import type { StoryObj } from '@storybook/web-components';
import './ss-select';
import { SSSelectProps } from './ss-select.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        options: {
            label: string;
            value: string;
        }[];
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSSelectProps>> | undefined;
    render: (args: SSSelectProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSSelectProps>;
export declare const PreSelectedOption: Story;
