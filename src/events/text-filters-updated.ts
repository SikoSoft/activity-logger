import { TextContext } from 'api-spec/models/List';

export const textFiltersUpdatedEventName = 'input-changed';

export interface TextFiltersUpdatedEventPayload {
  text: TextContext[];
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
