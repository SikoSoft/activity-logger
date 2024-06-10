import { TextType } from 'api-spec/models/List';

export const textFilterUpdatedEventName = 'text-filter-updated';

export interface TextFilterUpdatedEventPayload {
  type: TextType;
  subStr: string;
  index: number;
}

export class TextFilterUpdatedEvent extends CustomEvent<TextFilterUpdatedEventPayload> {
  constructor(payload: TextFilterUpdatedEventPayload) {
    super(textFilterUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
