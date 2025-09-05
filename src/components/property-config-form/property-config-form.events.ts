import { EntityPropertyConfig } from 'api-spec/models/Entity';

export const propertyConfigUpdatedEventName = 'property-config-updated';

export type PropertyConfigUpdatedPayload = EntityPropertyConfig;

export class PropertyConfigUpdatedEvent extends CustomEvent<PropertyConfigUpdatedPayload> {
  constructor(detail: PropertyConfigUpdatedPayload) {
    super(propertyConfigUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
