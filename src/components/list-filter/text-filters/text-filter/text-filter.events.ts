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

export const textFilterSaveEventName = 'text-filter-save';

export interface TextFilterSaveEventPayload {
  index: number;
}

export class TextFilterSaveEvent extends CustomEvent<TextFilterSaveEventPayload> {
  constructor(payload: TextFilterSaveEventPayload) {
    super(textFilterSaveEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
