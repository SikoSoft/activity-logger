export declare const selectChangedEventName = "select-changed";
export interface SelectChangedEventPayload<T> {
    value: T;
}
export declare class SelectChangedEvent<T> extends CustomEvent<SelectChangedEventPayload<T>> {
    constructor(payload: SelectChangedEventPayload<T>);
}
