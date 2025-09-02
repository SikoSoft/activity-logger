import { EntityPropertyConfig } from '@/models/Entity';

export const propertyConfigFormUpdatedEventName =
  'property-config-form-updated';

export type PropertyConfigFormUpdatedPayload = EntityPropertyConfig;

export class PropertyConfigFormUpdatedEvent extends CustomEvent<PropertyConfigFormUpdatedPayload> {
  constructor(detail: PropertyConfigFormUpdatedPayload) {
    super(propertyConfigFormUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
