export const popUpOpenedEventName = 'pop-up-opened';
export class PopUpOpenedEvent extends CustomEvent {
    constructor(payload) {
        super(popUpOpenedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
export const popUpClosedEventName = 'pop-up-closed';
export class PopUpClosedEvent extends CustomEvent {
    constructor(payload) {
        super(popUpClosedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=pop-up.events.js.map