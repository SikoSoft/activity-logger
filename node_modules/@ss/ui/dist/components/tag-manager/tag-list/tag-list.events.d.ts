export declare const tagDeletedEventName = "tag-deleted";
export interface TagDeletedEventPayload {
    tag: string;
}
export declare class TagDeletedEvent extends CustomEvent<TagDeletedEventPayload> {
    constructor(payload: TagDeletedEventPayload);
}
