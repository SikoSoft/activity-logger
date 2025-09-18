export declare const tagInputUpdatedEventName = "tag-input-updated";
export interface TagInputUpdatedEventPayload {
    value: string;
}
export declare class TagInputUpdatedEvent extends CustomEvent<TagInputUpdatedEventPayload> {
    constructor(payload: TagInputUpdatedEventPayload);
}
export declare const tagAddedEventName = "tag-added";
export interface TagAddedEventPayload {
    tag: string;
}
export declare class TagAddedEvent extends CustomEvent<TagAddedEventPayload> {
    constructor(payload: TagAddedEventPayload);
}
export declare const tagSuggestionsUpdatedEventName = "tag-suggestions-updated";
export interface TagSuggestionsUpdatedEventPayload {
    suggestions: string[];
}
export declare class TagSuggestionsUpdatedEvent extends CustomEvent<TagSuggestionsUpdatedEventPayload> {
    constructor(payload: TagSuggestionsUpdatedEventPayload);
}
export declare const tagSuggestionsRequestedEventName = "tag-suggestions-requested";
export interface TagSuggestionsRequestedEventPayload {
    value: string;
}
export declare class TagSuggestionsRequestedEvent extends CustomEvent<TagSuggestionsRequestedEventPayload> {
    constructor(payload: TagSuggestionsRequestedEventPayload);
}
