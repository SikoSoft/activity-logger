import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './ss-toggle';
import { SSToggleProps, ssToggleProps } from './ss-toggle.models';

const argTypes = StoryBook.buildArgTypes(ssToggleProps);

const meta = {
  title: 'components/ss-toggle',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    on: ssToggleProps.on.default,
    highlightTime: ssToggleProps.highlightTime.default,
  },
  argTypes,
  render: args => html`
    <ss-toggle ?on=${args.on} highlightTime=${args.highlightTime}></ss-toggle>
  `,
} satisfies Meta<SSToggleProps>;

export default meta;
type Story = StoryObj<SSToggleProps>;

export const Off: Story = {
  args: {
    on: false,
  },
};

export const On: Story = {
  args: {
    on: true,
  },
};
