import { ImageDataValue } from 'api-spec/models/Entity';

export const imagePropertyChangedEventName = 'image-property-changed';

export interface ImagePropertyChangedEventPayload {
  propertyId: number;
  value: ImageDataValue;
}

export class ImagePropertyChangedEvent extends CustomEvent<ImagePropertyChangedEventPayload> {
  constructor(detail: ImagePropertyChangedEventPayload) {
    super(imagePropertyChangedEventName, { detail });
  }
}
