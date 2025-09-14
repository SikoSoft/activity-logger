import { IntDataValue } from 'api-spec/models/Entity';

export const intPropertyChangedEventName = 'int-property-changed';

export interface IntPropertyChangedEventPayload {
  propertyId: number;
  value: IntDataValue;
}

export class IntPropertyChangedEvent extends CustomEvent<IntPropertyChangedEventPayload> {
  constructor(detail: IntPropertyChangedEventPayload) {
    super(intPropertyChangedEventName, { detail });
  }
}
