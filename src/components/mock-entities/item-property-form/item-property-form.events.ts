import { ItemProperty } from '@/models/Entity';

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
