export declare const tagsUpdatedEventName = "tags-updated";
export interface TagsUpdatedEventPayload {
    tags: string[];
}
export declare class TagsUpdatedEvent extends CustomEvent<TagsUpdatedEventPayload> {
    constructor(payload: TagsUpdatedEventPayload);
}
