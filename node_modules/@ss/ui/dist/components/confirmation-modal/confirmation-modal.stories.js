import { html } from 'lit';
import { StoryBook } from '../../lib/StoryBook';
import './confirmation-modal';
import { confirmationModalProps, } from './confirmation-modal.models';
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
    render: args => html `
    <confirmation-modal
      ?open=${args.open}
      message=${args.message}
      acceptText=${args.acceptText}
      declineText=${args.declineText}
    >
    </confirmation-modal>
  `,
};
export default meta;
export const Default = {
    args: {
        open: true,
        message: 'Are you sure you want to proceed?',
        acceptText: 'Yes',
        declineText: 'No',
    },
};
export const AnyMessageYouLike = {
    args: {
        open: true,
        message: 'This is a custom message!',
        acceptText: 'Sure',
        declineText: 'Nope',
    },
};
//# sourceMappingURL=confirmation-modal.stories.js.map