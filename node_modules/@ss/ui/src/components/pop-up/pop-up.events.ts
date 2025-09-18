export const popUpOpenedEventName = 'pop-up-opened';

export type PopUpOpenedEventPayload = Record<string, never>;

export class PopUpOpenedEvent extends CustomEvent<PopUpOpenedEventPayload> {
  constructor(payload: PopUpOpenedEventPayload) {
    super(popUpOpenedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const popUpClosedEventName = 'pop-up-closed';

export type PopUpClosedEventPayload = Record<string, never>;

export class PopUpClosedEvent extends CustomEvent<PopUpClosedEventPayload> {
  constructor(payload: PopUpClosedEventPayload) {
    super(popUpClosedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
