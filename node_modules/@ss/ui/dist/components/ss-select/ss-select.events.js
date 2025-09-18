export const selectChangedEventName = 'select-changed';
export class SelectChangedEvent extends CustomEvent {
    constructor(payload) {
        super(selectChangedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=ss-select.events.js.map