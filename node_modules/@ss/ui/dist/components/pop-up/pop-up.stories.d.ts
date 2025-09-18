import type { StoryObj } from '@storybook/web-components';
import './pop-up';
import { PopUpProps } from './pop-up.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        closeButton: true;
        open: true;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<PopUpProps>> | undefined;
    render: (args: PopUpProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<PopUpProps>;
export declare const CloseButton: Story;
export declare const NoCloseButton: Story;
