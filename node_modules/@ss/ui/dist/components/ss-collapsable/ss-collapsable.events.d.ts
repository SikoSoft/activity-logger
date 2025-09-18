export declare const collapsableToggledEventName = "collapsable-toggled";
export interface CollapsableToggledEventPayload {
    panelId: string;
    isOpen: boolean;
}
export declare class CollapsableToggledEvent extends CustomEvent<CollapsableToggledEventPayload> {
    constructor(payload: CollapsableToggledEventPayload);
}
