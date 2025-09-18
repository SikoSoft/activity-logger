export declare const inputChangedEventName = "input-changed";
export interface InputChangedEventPayload {
    value: string;
}
export declare class InputChangedEvent extends CustomEvent<InputChangedEventPayload> {
    constructor(payload: InputChangedEventPayload);
}
export declare const inputSubmittedEventName = "input-submitted";
export interface InputSubmittedEventPayload {
    value: string;
}
export declare class InputSubmittedEvent extends CustomEvent<InputSubmittedEventPayload> {
    constructor(payload: InputSubmittedEventPayload);
}
