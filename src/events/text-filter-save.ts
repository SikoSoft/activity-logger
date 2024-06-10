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
