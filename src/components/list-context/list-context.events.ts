import { ListContext } from 'api-spec/models/List';

export const listContextUpdatedEventName = 'list-context-updated';

export interface ListContextUpdatedEventPayload {
  listContext: ListContext;
}

export class ListContextUpdatedEvent extends CustomEvent<ListContextUpdatedEventPayload> {
  constructor(payload: ListContextUpdatedEventPayload) {
    super(listContextUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
