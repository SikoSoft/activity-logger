import { ItemProperty } from '@/models/Entity';

export const itemPropertyUpdatedEventName = 'item-property-updated';

export type ItemPropertyUpdatedEventPayload = ItemProperty;

export class ItemPropertyUpdatedEvent extends CustomEvent<ItemPropertyUpdatedEventPayload> {
  constructor(payload: ItemPropertyUpdatedEventPayload) {
    super(itemPropertyUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
