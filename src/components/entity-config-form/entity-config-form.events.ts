import { Entity } from 'api-spec/models/Entity';

export const entityConfigUpdatedEventName = 'entity-config-updated';

export type EntityConfigUpdatedPayload = Entity;

export class EntityConfigUpdatedEvent extends CustomEvent<EntityConfigUpdatedPayload> {
  constructor(detail: EntityConfigUpdatedPayload) {
    super(entityConfigUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
