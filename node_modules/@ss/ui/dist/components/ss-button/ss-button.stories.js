import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-button';
import { ssButtonProps } from './ss-button.models';
const argTypes = StoryBook.buildArgTypes(ssButtonProps);
const meta = {
    title: 'components/ss-button',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        text: 'Click me',
        disabled: false,
        loading: false,
        positive: false,
        negative: false,
        class: '',
    },
    argTypes,
    render: args => html `
    <ss-button
      text=${args.text}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?positive=${args.positive}
      ?negative=${args.negative}
    ></ss-button>
  `,
};
export default meta;
export const Disabled = {
    args: {
        text: "Can't touch this",
        disabled: true,
    },
};
export const Loading = {
    args: {
        loading: true,
    },
};
export const Positive = {
    args: {
        positive: true,
    },
};
export const Negative = {
    args: {
        negative: true,
    },
};
//# sourceMappingURL=ss-button.stories.js.map