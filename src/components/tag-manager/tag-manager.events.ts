export const tagsUpdatedEventName = 'tags-updated';

export interface TagsUpdatedEventPayload {
  tags: string[];
}

export class TagsUpdatedEvent extends CustomEvent<TagsUpdatedEventPayload> {
  constructor(payload: TagsUpdatedEventPayload) {
    super(tagsUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
