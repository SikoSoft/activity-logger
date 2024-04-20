import { html, TemplateResult } from 'lit';
import '../src/food-journal.js';

export default {
  title: 'FoodJournal',
  component: 'food-journal',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <food-journal style="--food-journal-background-color: ${backgroundColor}" .header=${header}></food-journal>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
