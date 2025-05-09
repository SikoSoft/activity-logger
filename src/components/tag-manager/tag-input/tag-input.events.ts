export const tagInputUpdatedEventName = 'tag-input-updated';

export interface TagInputUpdatedEventPayload {
  value: string;
}

export class TagInputUpdatedEvent extends CustomEvent<TagInputUpdatedEventPayload> {
  constructor(payload: TagInputUpdatedEventPayload) {
    super(tagInputUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const tagAddedEventName = 'tag-added';

export interface TagAddedEventPayload {
  tag: string;
}

export class TagAddedEvent extends CustomEvent<TagAddedEventPayload> {
  constructor(payload: TagAddedEventPayload) {
    super(tagAddedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const tagSuggestionsUpdatedEventName = 'tag-suggestions-updated';

export interface TagSuggestionsUpdatedEventPayload {
  suggestions: string[];
}

export class TagSuggestionsUpdatedEvent extends CustomEvent<TagSuggestionsUpdatedEventPayload> {
  constructor(payload: TagSuggestionsUpdatedEventPayload) {
    super(tagSuggestionsUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const tagSuggestionsRequestedEventName = 'tag-suggestions-requested';

export interface TagSuggestionsRequestedEventPayload {
  value: string;
}

export class TagSuggestionsRequestedEvent extends CustomEvent<TagSuggestionsRequestedEventPayload> {
  constructor(payload: TagSuggestionsRequestedEventPayload) {
    super(tagSuggestionsRequestedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
