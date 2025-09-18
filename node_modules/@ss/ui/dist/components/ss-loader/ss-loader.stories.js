import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-loader';
import { ssLoaderProps } from './ss-loader.models';
const argTypes = StoryBook.buildArgTypes(ssLoaderProps);
const meta = {
    title: 'components/ss-loader',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        padded: false,
    },
    argTypes,
    render: args => html ` <ss-loader ?padded=${args.padded}></ss-loader> `,
};
export default meta;
export const Padded = {
    args: {
        padded: false,
    },
};
//# sourceMappingURL=ss-loader.stories.js.map