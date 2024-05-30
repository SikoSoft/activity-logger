export const inputSubmittedEventName = 'input-submitted';

export interface InputSubmittedEventPayload {
  value: string;
}

export class InputSubmittedEvent extends CustomEvent<InputSubmittedEventPayload> {
  constructor(payload: InputSubmittedEventPayload) {
    super(inputSubmittedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
