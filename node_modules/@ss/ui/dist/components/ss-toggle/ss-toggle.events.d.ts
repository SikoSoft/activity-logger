export declare const toggleChangedEventName = "toggle-changed";
export interface ToggleChangedEventPayload {
    on: boolean;
}
export declare class ToggleChangedEvent extends CustomEvent<ToggleChangedEventPayload> {
    constructor(payload: ToggleChangedEventPayload);
}
