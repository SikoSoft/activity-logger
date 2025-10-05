import { EntityConfig } from 'api-spec/models/Entity';

export const entityConfigUpdatedEventName = 'entity-config-updated';

export type EntityConfigUpdatedPayload = EntityConfig;

export class EntityConfigUpdatedEvent extends CustomEvent<EntityConfigUpdatedPayload> {
  constructor(detail: EntityConfigUpdatedPayload) {
    super(entityConfigUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export const entityConfigDeletedEventName = 'entity-config-deleted';

export type EntityConfigDeletedPayload = { id: number };

export class EntityConfigDeletedEvent extends CustomEvent<EntityConfigDeletedPayload> {
  constructor(detail: EntityConfigDeletedPayload) {
    super(entityConfigDeletedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
