import { TimeContext } from 'api-spec/models/List';

export const timeFiltersUpdatedEventName = 'time-filters-updated';

export type TimeFiltersUpdatedEventPayload = TimeContext;

export class TimeFiltersUpdatedEvent extends CustomEvent<TimeFiltersUpdatedEventPayload> {
  constructor(payload: TimeFiltersUpdatedEventPayload) {
    super(timeFiltersUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
