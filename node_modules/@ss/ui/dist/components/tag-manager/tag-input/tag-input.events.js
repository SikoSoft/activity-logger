export const tagInputUpdatedEventName = 'tag-input-updated';
export class TagInputUpdatedEvent extends CustomEvent {
    constructor(payload) {
        super(tagInputUpdatedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const tagAddedEventName = 'tag-added';
export class TagAddedEvent extends CustomEvent {
    constructor(payload) {
        super(tagAddedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const tagSuggestionsUpdatedEventName = 'tag-suggestions-updated';
export class TagSuggestionsUpdatedEvent extends CustomEvent {
    constructor(payload) {
        super(tagSuggestionsUpdatedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const tagSuggestionsRequestedEventName = 'tag-suggestions-requested';
export class TagSuggestionsRequestedEvent extends CustomEvent {
    constructor(payload) {
        super(tagSuggestionsRequestedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=tag-input.events.js.map