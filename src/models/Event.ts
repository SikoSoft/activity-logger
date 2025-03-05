import { ListFilterType } from 'api-spec/models/List';

export enum EventType {
  INCLUDE_UNTAGGED_UPDATED = 'include-untagged-updated',
  FILTER_TAGS_UPDATED = 'filter-tags-updated',
  SELECT_CHANGED = 'select-changed',
}

export interface EventPayload {
  [EventType.FILTER_TAGS_UPDATED]: {
    type: ListFilterType;
    tags: string[];
  };
  [EventType.INCLUDE_UNTAGGED_UPDATED]: {};
  [EventType.SELECT_CHANGED]: {
    value: string;
  };
}
