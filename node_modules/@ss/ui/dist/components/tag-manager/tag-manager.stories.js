import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './tag-manager';
import { TagManagerProp, tagManagerProps, } from './tag-manager.models';
const argTypes = StoryBook.buildArgTypes(tagManagerProps);
const meta = {
    title: 'components/tag-manager',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        value: '',
        enableSuggestions: tagManagerProps[TagManagerProp.ENABLE_SUGGESTIONS].default,
    },
    argTypes,
    render: args => html `
    <tag-manager
      value=${args.value}
      ?enableSuggestions=${args.enableSuggestions}
    >
      <div slot="tags">
        <data-item>monkey</data-item>
        <data-item>tiger</data-item>
      </div>
      <div slot="suggestions">
        <data-item>apple</data-item>
        <data-item>cat</data-item>
        <data-item>banana</data-item>
        <data-item>dog</data-item>
        <data-item>grape</data-item>
        <data-item>kiwi</data-item>
        <data-item>lemon</data-item>
        <data-item>mango</data-item>
        <data-item>orange</data-item>
        <data-item>peach</data-item>
      </div>
    </tag-manager>
  `,
};
export default meta;
export const WithSuggestions = {
    args: {
        enableSuggestions: true,
    },
};
export const WithoutSuggestions = {
    args: {
        enableSuggestions: false,
    },
};
//# sourceMappingURL=tag-manager.stories.js.map