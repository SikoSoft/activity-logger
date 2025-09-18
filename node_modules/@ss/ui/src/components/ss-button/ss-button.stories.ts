import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './ss-button';
import { SSButtonProps, ssButtonProps } from './ss-button.models';

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
  render: args => html`
    <ss-button
      text=${args.text}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?positive=${args.positive}
      ?negative=${args.negative}
    ></ss-button>
  `,
} satisfies Meta<SSButtonProps>;

export default meta;
type Story = StoryObj<SSButtonProps>;

export const Disabled: Story = {
  args: {
    text: "Can't touch this",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Positive: Story = {
  args: {
    positive: true,
  },
};

export const Negative: Story = {
  args: {
    negative: true,
  },
};
