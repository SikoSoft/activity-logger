import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { StoryBook } from '../../lib/StoryBook';

import './confirmation-modal';
import {
  ConfirmationModalProps,
  confirmationModalProps,
} from './confirmation-modal.models';
import exp from 'constants';

const argTypes = StoryBook.buildArgTypes(confirmationModalProps);

const meta = {
  title: 'components/confirmation-modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    message: 'Are you sure you want to proceed?',
    acceptText: 'Yes',
    declineText: 'No',
  },
  argTypes,
  render: args => html`
    <confirmation-modal
      ?open=${args.open}
      message=${args.message}
      acceptText=${args.acceptText}
      declineText=${args.declineText}
    >
    </confirmation-modal>
  `,
} satisfies Meta<ConfirmationModalProps>;

export default meta;
type Story = StoryObj<ConfirmationModalProps>;

export const Default: Story = {
  args: {
    open: true,
    message: 'Are you sure you want to proceed?',
    acceptText: 'Yes',
    declineText: 'No',
  },
};

export const AnyMessageYouLike: Story = {
  args: {
    open: true,
    message: 'This is a custom message!',
    acceptText: 'Sure',
    declineText: 'Nope',
  },
};
