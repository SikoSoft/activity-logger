import { ListFilterType } from 'api-spec/models/List';

export const includeUntaggedUpdatedEventName = 'include-untagged-updated';

export interface IncludeUntaggedUpdatedEventPayload {}

export class IncludeUntaggedUpdatedEvent extends CustomEvent<IncludeUntaggedUpdatedEventPayload> {
  constructor(payload: IncludeUntaggedUpdatedEventPayload) {
    super(includeUntaggedUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const filterTagsUpdatedEventName = 'filter-tags-updated';

export interface FilterTagsUpdatedEventPayload {
  type: ListFilterType;
  tags: string[];
}

export class FilterTagsUpdatedEvent extends CustomEvent<FilterTagsUpdatedEventPayload> {
  constructor(payload: FilterTagsUpdatedEventPayload) {
    super(filterTagsUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
