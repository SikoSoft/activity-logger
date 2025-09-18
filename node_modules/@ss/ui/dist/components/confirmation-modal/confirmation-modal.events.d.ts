export declare const confirmationAcceptedEventName = "confirmation-accepted";
export type ConfirmationAcceptedEventPayload = Record<string, never>;
export declare class ConfirmationAcceptedEvent extends CustomEvent<ConfirmationAcceptedEventPayload> {
    constructor(payload: ConfirmationAcceptedEventPayload);
}
export declare const confirmationDeclinedEventName = "confirmation-declined";
export type ConfirmationDeclinedEventPayload = Record<string, never>;
export declare class ConfirmationDeclinedEvent extends CustomEvent<ConfirmationDeclinedEventPayload> {
    constructor(payload: ConfirmationDeclinedEventPayload);
}
