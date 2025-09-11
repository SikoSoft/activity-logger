export const textPropertyChangedEventName = 'text-property-changed';

export interface TextPropertyChangedEventPayload {
  propertyId: number;
  value: string;
}

export class TextPropertyChangedEvent extends CustomEvent<TextPropertyChangedEventPayload> {
  constructor(detail: TextPropertyChangedEventPayload) {
    super(textPropertyChangedEventName, { detail });
  }
}
