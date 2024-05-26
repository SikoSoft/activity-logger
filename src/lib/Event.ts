import { EventPayload, EventType } from '@/models/Event';

export class FilterTagsUpdatedEvent extends CustomEvent<
  EventPayload[EventType.FILTER_TAGS_UPDATED]
> {
  constructor(payload: EventPayload[EventType.FILTER_TAGS_UPDATED]) {
    super(EventType.FILTER_TAGS_UPDATED, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export class IncludeUntaggedUpdatedEvent extends CustomEvent<
  EventPayload[EventType.INCLUDE_UNTAGGED_UPDATED]
> {
  constructor(payload: EventPayload[EventType.INCLUDE_UNTAGGED_UPDATED]) {
    super(EventType.INCLUDE_UNTAGGED_UPDATED, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export class SelectChangedEvent extends CustomEvent<
  EventPayload[EventType.SELECT_CHANGED]
> {
  constructor(payload: EventPayload[EventType.SELECT_CHANGED]) {
    super(EventType.SELECT_CHANGED, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export class TimeFiltersUpdatedEvent extends CustomEvent<
  EventPayload[EventType.TIME_FILTERS_UPDATED]
> {
  constructor(payload: EventPayload[EventType.TIME_FILTERS_UPDATED]) {
    super(EventType.TIME_FILTERS_UPDATED, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
