export var ConfirmationModalProp;
(function (ConfirmationModalProp) {
    ConfirmationModalProp["OPEN"] = "open";
    ConfirmationModalProp["MESSAGE"] = "message";
    ConfirmationModalProp["ACCEPT_TEXT"] = "acceptText";
    ConfirmationModalProp["DECLINE_TEXT"] = "declineText";
})(ConfirmationModalProp || (ConfirmationModalProp = {}));
export const confirmationModalProps = {
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
//# sourceMappingURL=confirmation-modal.models.js.map