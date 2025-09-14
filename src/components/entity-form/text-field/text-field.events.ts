import { LongTextDataValue, ShortTextDataValue } from 'api-spec/models/Entity';

export const textPropertyChangedEventName = 'text-property-changed';

export interface TextPropertyChangedEventPayload {
  propertyId: number;
  value: LongTextDataValue | ShortTextDataValue;
}

export class TextPropertyChangedEvent extends CustomEvent<TextPropertyChangedEventPayload> {
  constructor(detail: TextPropertyChangedEventPayload) {
    super(textPropertyChangedEventName, { detail });
  }
}
