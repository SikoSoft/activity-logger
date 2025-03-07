import { TextContext } from 'api-spec/models/List';

export const textFiltersUpdatedEventName = 'text-filters-updated';

export interface TextFiltersUpdatedEventPayload {
  filters: TextContext[];
}

export class TextFiltersUpdatedEvent extends CustomEvent<TextFiltersUpdatedEventPayload> {
  constructor(payload: TextFiltersUpdatedEventPayload) {
    super(textFiltersUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
