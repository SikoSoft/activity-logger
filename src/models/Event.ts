import { ListFilterType } from './ListFilter';

export enum EventType {
  INCLUDE_UNTAGGED_UPDATED = 'include-untagged-updated',
  FILTER_TAGS_UPDATED = 'filter-tags-updated',
}

export interface EventPayload {
  [EventType.FILTER_TAGS_UPDATED]: {
    type: ListFilterType;
    tags: string[];
  };
  [EventType.INCLUDE_UNTAGGED_UPDATED]: {};
}
