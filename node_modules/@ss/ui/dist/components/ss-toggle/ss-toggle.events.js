export const toggleChangedEventName = 'toggle-changed';
export class ToggleChangedEvent extends CustomEvent {
    constructor(payload) {
        super(toggleChangedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=ss-toggle.events.js.map