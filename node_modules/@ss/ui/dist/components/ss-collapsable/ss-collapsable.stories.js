import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-collapsable';
import { ssCollapsableProps, } from './ss-collapsable.models';
const argTypes = StoryBook.buildArgTypes(ssCollapsableProps);
const meta = {
    title: 'components/ss-collapsable',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Heading',
        open: true,
    },
    argTypes,
    render: args => html `
    <ss-collapsable ?open=${args.open} title=${args.title}
      >This is some content that can be toggled into view.</ss-collapsable
    >
  `,
};
export default meta;
export const Open = {
    args: {
        title: 'Collapsable',
        open: true,
    },
};
export const Closed = {
    args: {
        title: 'Collapsable',
        open: false,
    },
};
//# sourceMappingURL=ss-collapsable.stories.js.map