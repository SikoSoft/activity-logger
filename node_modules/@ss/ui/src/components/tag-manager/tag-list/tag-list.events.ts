export const tagDeletedEventName = 'tag-deleted';

export interface TagDeletedEventPayload {
  tag: string;
}

export class TagDeletedEvent extends CustomEvent<TagDeletedEventPayload> {
  constructor(payload: TagDeletedEventPayload) {
    super(tagDeletedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
