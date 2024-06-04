export const inputChangedEventName = 'input-changed';

export interface InputChangedEventPayload {
  value: string;
}

export class InputChangedEvent extends CustomEvent<InputChangedEventPayload> {
  constructor(payload: InputChangedEventPayload) {
    super(inputChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
