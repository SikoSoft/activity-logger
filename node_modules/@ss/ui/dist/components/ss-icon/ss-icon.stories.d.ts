import type { StoryObj } from '@storybook/web-components';
import './ss-icon';
import { IconName, SSIconProps } from './ss-icon.models';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        name: IconName.PROFILE;
        size: number;
        color: string;
    };
    argTypes: Partial<import("@storybook/core/csf").ArgTypes<SSIconProps>> | undefined;
    render: (args: SSIconProps) => import("lit-html").TemplateResult<1>;
};
export default meta;
type Story = StoryObj<SSIconProps>;
export declare const Profile: Story;
export declare const ArrowCircleLeft: Story;
export declare const ArrowCircleRight: Story;
export declare const ValidCircle: Story;
export declare const InvalidCircle: Story;
export declare const Gear: Story;
export declare const Delete: Story;
