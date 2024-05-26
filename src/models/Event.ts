import { ListFilterType, TimeContext } from './ListFilter';

export enum EventType {
  INCLUDE_UNTAGGED_UPDATED = 'include-untagged-updated',
  FILTER_TAGS_UPDATED = 'filter-tags-updated',
  SELECT_CHANGED = 'select-changed',
  TIME_FILTERS_UPDATED = 'time-filters-updated',
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
  [EventType.TIME_FILTERS_UPDATED]: TimeContext;
}
