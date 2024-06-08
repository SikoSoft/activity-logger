export const pointerUpEventName = 'pointer-up';

export interface PointerUpEventPayload {
  time: Date;
}

export class PointerUpEvent extends CustomEvent<PointerUpEventPayload> {
  constructor(payload: PointerUpEventPayload) {
    super(pointerUpEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
