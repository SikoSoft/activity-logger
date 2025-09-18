export declare const suggestionChangedEventName = "suggestion-changed";
export interface SuggestionChangedEventPayload {
    value: string;
}
export declare class SuggestionChangedEvent extends CustomEvent<SuggestionChangedEventPayload> {
    constructor(payload: SuggestionChangedEventPayload);
}
export declare const suggestionSubmittedEventName = "suggestion-submitted";
export interface SuggestionSubmittedEventPayload {
    selectedIndex: number;
}
export declare class SuggestionSubmittedEvent extends CustomEvent<SuggestionSubmittedEventPayload> {
    constructor(payload: SuggestionSubmittedEventPayload);
}
