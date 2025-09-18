export const confirmationAcceptedEventName = 'confirmation-accepted';
export class ConfirmationAcceptedEvent extends CustomEvent {
    constructor(payload) {
        super(confirmationAcceptedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const confirmationDeclinedEventName = 'confirmation-declined';
export class ConfirmationDeclinedEvent extends CustomEvent {
    constructor(payload) {
        super(confirmationDeclinedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=confirmation-modal.events.js.map