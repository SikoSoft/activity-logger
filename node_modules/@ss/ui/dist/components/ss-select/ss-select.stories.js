import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-select';
import { ssSelectProps } from './ss-select.models';
const argTypes = StoryBook.buildArgTypes(ssSelectProps);
const meta = {
    title: 'components/ss-select',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option-2' },
            { label: 'Option 3', value: 'option-3' },
        ],
    },
    argTypes,
    render: args => html `
    <ss-select .options=${args.options} selected=${args.selected}></ss-select>
  `,
};
export default meta;
export const PreSelectedOption = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option-2' },
            { label: 'Option 3', value: 'option-3' },
        ],
        selected: 'option-2',
    },
};
//# sourceMappingURL=ss-select.stories.js.map