export const pointerDownEventName = 'pointer-down';

export interface PointerDownEventPayload {
  time: Date;
}

export class PointerDownEvent extends CustomEvent<PointerDownEventPayload> {
  constructor(payload: PointerDownEventPayload) {
    super(pointerDownEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
