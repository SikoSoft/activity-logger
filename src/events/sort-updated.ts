import { ListSort } from 'api-spec/models/List';

export const sortUpdatedEventName = 'sort-updated';

export interface SortUpdatedEventPayload {
  sort: ListSort;
}

export class SortUpdatedEvent extends CustomEvent<SortUpdatedEventPayload> {
  constructor(payload: SortUpdatedEventPayload) {
    super(sortUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
