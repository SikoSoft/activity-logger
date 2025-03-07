export const listConfigChangedEventName = 'list-config-changed';

export interface ListConfigChangedEventPayload {
  listConfigId: string;
}

export class ListConfigChangedEvent extends CustomEvent<ListConfigChangedEventPayload> {
  constructor(payload: ListConfigChangedEventPayload) {
    super(listConfigChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
