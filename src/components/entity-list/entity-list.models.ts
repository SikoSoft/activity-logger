export const entityListLoadEventName = 'entity-list-load';

export type EntityListLoadPayload = Record<string, never>;

export class EntityListLoadEvent extends CustomEvent<EntityListLoadPayload> {
  constructor(detail: EntityListLoadPayload = {}) {
    super(entityListLoadEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export const entityListSyncEventName = 'entity-list-sync';

export type EntityListSyncPayload = Record<string, never>;

export class EntityListSyncEvent extends CustomEvent<EntityListSyncPayload> {
  constructor(detail: EntityListSyncPayload = {}) {
    super(entityListSyncEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
