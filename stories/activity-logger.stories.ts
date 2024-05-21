import { html, TemplateResult } from 'lit';
import '../src/activity-logger.js';

export default {
  title: 'ActivityLogger',
  component: 'activity-logger',
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

const Template: Story<ArgTypes> = ({
  header,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <activity-logger
    style="--food-journal-background-color: ${backgroundColor}"
    .header=${header}
  ></activity-logger>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
