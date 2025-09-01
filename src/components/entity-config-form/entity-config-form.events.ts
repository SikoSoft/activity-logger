export const entityConfigFormUpdatedEventName = 'entity-config-form-updated';

export type EntityConfigFormUpdatedPayload = {};

export class EntityConfigFormUpdatedEvent extends CustomEvent<EntityConfigFormUpdatedPayload> {
  constructor(detail: EntityConfigFormUpdatedPayload) {
    super(entityConfigFormUpdatedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
