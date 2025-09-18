import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './ss-collapsable';
import {
  SSCollapsableProps,
  ssCollapsableProps,
} from './ss-collapsable.models';

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
  render: args => html`
    <ss-collapsable ?open=${args.open} title=${args.title}
      >This is some content that can be toggled into view.</ss-collapsable
    >
  `,
} satisfies Meta<SSCollapsableProps>;

export default meta;
type Story = StoryObj<SSCollapsableProps>;

export const Open: Story = {
  args: {
    title: 'Collapsable',
    open: true,
  },
};

export const Closed: Story = {
  args: {
    title: 'Collapsable',
    open: false,
  },
};
