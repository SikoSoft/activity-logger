import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './pop-up';
import { PopUpProps, popUpProps } from './pop-up.models';

const argTypes = StoryBook.buildArgTypes(popUpProps);

const meta = {
  title: 'components/pop-up',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    closeButton: true,
    open: true,
  },
  argTypes,
  render: args => html`
    <pop-up
      ?open=${args.open}
      ?closeButton=${args.closeButton}
      ?closeOnEsc=${args.closeOnEsc}
      ?closeOnOutsideClick=${args.closeOnOutsideClick}
    >
      >Some content to be displayed within a pop-up</pop-up
    >
  `,
} satisfies Meta<PopUpProps>;

export default meta;
type Story = StoryObj<PopUpProps>;

export const CloseButton: Story = {
  args: {
    closeButton: true,
    open: true,
  },
};

export const NoCloseButton: Story = {
  args: {
    closeButton: false,
    open: true,
  },
};
