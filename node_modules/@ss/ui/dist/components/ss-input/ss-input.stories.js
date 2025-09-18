import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './ss-input';
import { InputType } from '../../models/Input';
import { ssInputProps } from './ss-input.models';
const argTypes = StoryBook.buildArgTypes(ssInputProps);
const meta = {
    title: 'components/ss-input',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        type: InputType.TEXT,
    },
    argTypes,
    render: args => html `
    <ss-input
      type=${args.type}
      value=${args.value}
      ?autoComplete=${args.autoComplete}
      placeholder=${args.placeholder}
      min=${args.min}
      max=${args.max}
      step=${args.step}
    ></ss-input>
  `,
};
export default meta;
export const Text = {
    args: {
        type: InputType.TEXT,
    },
};
export const Number = {
    args: {
        type: InputType.NUMBER,
        min: 0,
        max: 100,
        step: 1,
    },
};
//# sourceMappingURL=ss-input.stories.js.map