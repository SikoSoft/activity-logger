import type { StoryObj } from '@storybook/web-components';
import './tag-manager';
import { TagManagerProps } from './tag-manager.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        value: string;
        enableSuggestions: boolean;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<TagManagerProps>> | undefined;
    render: (args: TagManagerProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<TagManagerProps>;
export declare const WithSuggestions: Story;
export declare const WithoutSuggestions: Story;
