export const propertyChangedEventName = 'property-changed';

export interface PropertyChangedEventPayload {
  property: string;
  value: any;
}

export class PropertyChangedEvent extends CustomEvent<PropertyChangedEventPayload> {
  constructor(detail: PropertyChangedEventPayload) {
    super(propertyChangedEventName, { detail });
  }
}
