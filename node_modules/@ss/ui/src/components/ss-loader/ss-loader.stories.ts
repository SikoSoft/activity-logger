import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './ss-loader';
import { SSLoaderProps, ssLoaderProps } from './ss-loader.models';

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
  render: args => html` <ss-loader ?padded=${args.padded}></ss-loader> `,
} satisfies Meta<SSLoaderProps>;

export default meta;
type Story = StoryObj<SSLoaderProps>;

export const Padded: Story = {
  args: {
    padded: false,
  },
};
