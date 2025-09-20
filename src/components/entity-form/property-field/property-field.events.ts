export const propertyClonedEventName = 'property-cloned';

export interface PropertyClonedEventPayload {
  propertyConfigId: number;
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
  propertyConfigId: number;
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
