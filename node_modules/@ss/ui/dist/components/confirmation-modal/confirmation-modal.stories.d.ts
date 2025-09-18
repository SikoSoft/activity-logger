import type { StoryObj } from '@storybook/web-components';
import './confirmation-modal';
import { ConfirmationModalProps } from './confirmation-modal.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        open: true;
        message: string;
        acceptText: string;
        declineText: string;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<ConfirmationModalProps>> | undefined;
    render: (args: ConfirmationModalProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<ConfirmationModalProps>;
export declare const Default: Story;
export declare const AnyMessageYouLike: Story;
