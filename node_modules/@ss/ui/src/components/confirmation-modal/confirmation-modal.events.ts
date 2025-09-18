export const confirmationAcceptedEventName = 'confirmation-accepted';

export type ConfirmationAcceptedEventPayload = Record<string, never>;

export class ConfirmationAcceptedEvent extends CustomEvent<ConfirmationAcceptedEventPayload> {
  constructor(payload: ConfirmationAcceptedEventPayload) {
    super(confirmationAcceptedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const confirmationDeclinedEventName = 'confirmation-declined';

export type ConfirmationDeclinedEventPayload = Record<string, never>;

export class ConfirmationDeclinedEvent extends CustomEvent<ConfirmationDeclinedEventPayload> {
  constructor(payload: ConfirmationDeclinedEventPayload) {
    super(confirmationDeclinedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
