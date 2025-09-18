export const suggestionChangedEventName = 'suggestion-changed';
export class SuggestionChangedEvent extends CustomEvent {
    constructor(payload) {
        super(suggestionChangedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const suggestionSubmittedEventName = 'suggestion-submitted';
export class SuggestionSubmittedEvent extends CustomEvent {
    constructor(payload) {
        super(suggestionSubmittedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=ss-input-auto.events.js.map