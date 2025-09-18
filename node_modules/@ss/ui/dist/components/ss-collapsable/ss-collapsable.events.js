export const collapsableToggledEventName = 'collapsable-toggled';
export class CollapsableToggledEvent extends CustomEvent {
    constructor(payload) {
        super(collapsableToggledEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=ss-collapsable.events.js.map