import { ItemProperty } from 'api-spec/models/Entity';

export const entityItemUpdatedEventName = 'entity-item-updated';

export interface EntityItemUpdatedEventPayload {
  id: number;
  desc: string;
  tags: string[];
}

export class EntityItemUpdatedEvent extends CustomEvent<EntityItemUpdatedEventPayload> {
  constructor(payload: EntityItemUpdatedEventPayload) {
    super(entityItemUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const entityItemDeletedEventName = 'entity-item-deleted';

export interface EntityItemDeletedEventPayload {
  id: number;
}

export class EntityItemDeletedEvent extends CustomEvent<EntityItemDeletedEventPayload> {
  constructor(payload: EntityItemDeletedEventPayload) {
    super(entityItemDeletedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const entityItemCanceledEventName = 'entity-item-canceled';

export interface EntityItemCanceledEventPayload {
  id: number;
}

export class EntityItemCanceledEvent extends CustomEvent<EntityItemCanceledEventPayload> {
  constructor(payload: EntityItemCanceledEventPayload) {
    super(entityItemCanceledEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const itemPropertyUpdatedEventName = 'item-property-updated';

export type ItemPropertyUpdatedEventPayload<T extends ItemProperty> = T;

export class ItemPropertyUpdatedEvent<
  T extends ItemProperty,
> extends CustomEvent<ItemPropertyUpdatedEventPayload<T>> {
  constructor(payload: ItemPropertyUpdatedEventPayload<T>) {
    super(itemPropertyUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
