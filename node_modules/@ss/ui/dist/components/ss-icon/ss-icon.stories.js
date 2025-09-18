import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-icon';
import { IconName, ssIconProps } from './ss-icon.models';
const argTypes = StoryBook.buildArgTypes(ssIconProps);
const meta = {
    title: 'components/ss-icon',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        name: IconName.PROFILE,
        size: ssIconProps.size.default,
        color: ssIconProps.color.default,
    },
    argTypes,
    render: args => html `
    <ss-icon name=${args.name} size=${args.size} color=${args.color}></ss-icon>
  `,
};
export default meta;
export const Profile = {
    args: {
        name: IconName.PROFILE,
    },
};
export const ArrowCircleLeft = {
    args: {
        name: IconName.ARROW_CIRCLE_LEFT,
    },
};
export const ArrowCircleRight = {
    args: {
        name: IconName.ARROW_CIRCLE_RIGHT,
    },
};
export const ValidCircle = {
    args: {
        name: IconName.VALID_CIRCLE,
    },
};
export const InvalidCircle = {
    args: {
        name: IconName.INVALID_CIRCLE,
    },
};
export const Gear = {
    args: {
        name: IconName.GEAR,
    },
};
export const Delete = {
    args: {
        name: IconName.DELETE,
    },
};
//# sourceMappingURL=ss-icon.stories.js.map