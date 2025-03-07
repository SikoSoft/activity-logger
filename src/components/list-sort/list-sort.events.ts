import { ListSort } from 'api-spec/models/List';

export const listSortUpdatedEventName = 'list-sort-updated';

export interface ListSortUpdatedEventPayload {
  sort: ListSort;
}

export class ListSortUpdatedEvent extends CustomEvent<ListSortUpdatedEventPayload> {
  constructor(payload: ListSortUpdatedEventPayload) {
    super(listSortUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
