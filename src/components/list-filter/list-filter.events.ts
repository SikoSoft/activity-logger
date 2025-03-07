export const listFilterUpdatedEventName = 'list-filter-updated';

export type ListFilterUpdatedEventPayload = Record<never, unknown>;

export class ListFilterUpdatedEvent extends CustomEvent<ListFilterUpdatedEventPayload> {
  constructor(payload: ListFilterUpdatedEventPayload) {
    super(listFilterUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
