export const collapsableToggledEventName = 'collapsable-toggled';

export interface CollapsableToggledEventPayload {
  panelId: string;
  isOpen: boolean;
}

export class CollapsableToggledEvent extends CustomEvent<CollapsableToggledEventPayload> {
  constructor(payload: CollapsableToggledEventPayload) {
    super(collapsableToggledEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
