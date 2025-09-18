import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ConfirmationModalProp {
  OPEN = 'open',
  MESSAGE = 'message',
  ACCEPT_TEXT = 'acceptText',
  DECLINE_TEXT = 'declineText',
}

export interface ConfirmationModalProps extends PropTypes {
  [ConfirmationModalProp.OPEN]: boolean;
  [ConfirmationModalProp.MESSAGE]: string;
  [ConfirmationModalProp.ACCEPT_TEXT]: string;
  [ConfirmationModalProp.DECLINE_TEXT]: string;
}

export const confirmationModalProps: PropConfigMap<ConfirmationModalProps> = {
  [ConfirmationModalProp.OPEN]: {
    default: false,
    control: 'boolean',
    description: 'Whether the pop-up is open or not',
  },
  [ConfirmationModalProp.MESSAGE]: {
    default: 'Are you sure?',
    control: 'text',
    description: 'The message to display in the pop-up',
  },
  [ConfirmationModalProp.ACCEPT_TEXT]: {
    default: 'Accept',
    control: 'text',
    description: 'Text for the accept button',
  },
  [ConfirmationModalProp.DECLINE_TEXT]: {
    default: 'Decline',
    control: 'text',
    description: 'Text for the decline button',
  },
};
