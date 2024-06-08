export const pointerLongPressEventName = 'pointer-long-press';

export interface PointerLongPressEventPayload {
  time: Date;
}

export class PointerLongPressEvent extends CustomEvent<PointerLongPressEventPayload> {
  constructor(payload: PointerLongPressEventPayload) {
    super(pointerLongPressEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
