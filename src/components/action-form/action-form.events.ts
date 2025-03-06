export const actionItemUpdatedEventName = 'action-item-updated';

export interface ActionItemUpdatedEventPayload {
  id: number;
  desc: string;
  occurredAt: string;
  tags: string[];
}

export class ActionItemUpdatedEvent extends CustomEvent<ActionItemUpdatedEventPayload> {
  constructor(payload: ActionItemUpdatedEventPayload) {
    super(actionItemUpdatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const actionItemDeletedEventName = 'action-item-deleted';

export interface ActionItemDeletedEventPayload {
  id: number;
}

export class ActionItemDeletedEvent extends CustomEvent<ActionItemDeletedEventPayload> {
  constructor(payload: ActionItemDeletedEventPayload) {
    super(actionItemDeletedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const actionItemCanceledEventName = 'action-item-canceled';

export interface ActionItemCanceledEventPayload {
  id: number;
}

export class ActionItemCanceledEvent extends CustomEvent<ActionItemCanceledEventPayload> {
  constructor(payload: ActionItemCanceledEventPayload) {
    super(actionItemCanceledEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
