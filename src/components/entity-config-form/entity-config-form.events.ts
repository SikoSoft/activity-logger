export const entityConfigUpdatedEventName = 'entity-config-updated';

export type EntityConfigUpdatedPayload = {};

export class EntityConfigUpdatedEvent extends CustomEvent<EntityConfigUpdatedPayload> {
  constructor(detail: EntityConfigUpdatedPayload) {
    super(entityConfigUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
