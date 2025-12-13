export const listReadEventName = 'list-ready';

export type ListReadyPayload = Record<string, never>;

export class ListReadyEvent extends CustomEvent<ListReadyPayload> {
  constructor(detail: ListReadyPayload = {}) {
    super(listReadEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
