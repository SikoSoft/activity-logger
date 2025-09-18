export const toggleChangedEventName = 'toggle-changed';

export interface ToggleChangedEventPayload {
  on: boolean;
}

export class ToggleChangedEvent extends CustomEvent<ToggleChangedEventPayload> {
  constructor(payload: ToggleChangedEventPayload) {
    super(toggleChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
