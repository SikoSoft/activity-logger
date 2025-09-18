export declare const popUpOpenedEventName = "pop-up-opened";
export type PopUpOpenedEventPayload = Record<string, never>;
export declare class PopUpOpenedEvent extends CustomEvent<PopUpOpenedEventPayload> {
    constructor(payload: PopUpOpenedEventPayload);
}
export declare const popUpClosedEventName = "pop-up-closed";
export type PopUpClosedEventPayload = Record<string, never>;
export declare class PopUpClosedEvent extends CustomEvent<PopUpClosedEventPayload> {
    constructor(payload: PopUpClosedEventPayload);
}
