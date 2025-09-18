export const tagDeletedEventName = 'tag-deleted';
export class TagDeletedEvent extends CustomEvent {
    constructor(payload) {
        super(tagDeletedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=tag-list.events.js.map