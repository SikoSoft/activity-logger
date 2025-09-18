export const suggestionChangedEventName = 'suggestion-changed';

export interface SuggestionChangedEventPayload {
  value: string;
}

export class SuggestionChangedEvent extends CustomEvent<SuggestionChangedEventPayload> {
  constructor(payload: SuggestionChangedEventPayload) {
    super(suggestionChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const suggestionSubmittedEventName = 'suggestion-submitted';

export interface SuggestionSubmittedEventPayload {
  selectedIndex: number;
}

export class SuggestionSubmittedEvent extends CustomEvent<SuggestionSubmittedEventPayload> {
  constructor(payload: SuggestionSubmittedEventPayload) {
    super(suggestionSubmittedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
