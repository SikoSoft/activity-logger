export const tagsUpdatedEventName = 'tags-updated';
export class TagsUpdatedEvent extends CustomEvent {
    constructor(payload) {
        super(tagsUpdatedEventName, {
            bubbles: true,
            composed: true,
            detail: payload,
        });
    }
}
//# sourceMappingURL=tag-manager.events.js.map