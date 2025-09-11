export const intPropertyChangedEventName = 'int-property-changed';

export interface IntPropertyChangedEventPayload {
  propertyId: number;
  value: number;
}

export class IntPropertyChangedEvent extends CustomEvent<IntPropertyChangedEventPayload> {
  constructor(detail: IntPropertyChangedEventPayload) {
    super(intPropertyChangedEventName, { detail });
  }
}
