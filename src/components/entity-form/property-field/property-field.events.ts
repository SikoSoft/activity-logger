import { DataTypedValue } from 'api-spec/models/Entity';

export const propertyChangedEventName = 'property-changed';

export type PropertyChangedEventPayload = Omit<
  DataTypedValue,
  'defaultValue'
> & {
  value: DataTypedValue['defaultValue'];
  uiId: string;
};

export class PropertyChangedEvent extends CustomEvent<PropertyChangedEventPayload> {
  constructor(payload: PropertyChangedEventPayload) {
    super(propertyChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const propertyClonedEventName = 'property-cloned';

export interface PropertyClonedEventPayload {
  uiId: string;
}

export class PropertyClonedEvent extends CustomEvent<PropertyClonedEventPayload> {
  constructor(payload: PropertyClonedEventPayload) {
    super(propertyClonedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const propertyDeletedEventName = 'property-deleted';

export interface PropertyDeletedEventPayload {
  uiId: string;
}

export class PropertyDeletedEvent extends CustomEvent<PropertyDeletedEventPayload> {
  constructor(payload: PropertyDeletedEventPayload) {
    super(propertyDeletedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const propertySubmittedEventName = 'property-submitted';

export interface PropertySubmittedEventPayload {
  uiId: string;
}

export class PropertySubmittedEvent extends CustomEvent<PropertySubmittedEventPayload> {
  constructor(payload: PropertySubmittedEventPayload) {
    super(propertySubmittedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
