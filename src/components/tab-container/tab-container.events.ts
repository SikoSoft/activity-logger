export const tabIndexChangedEventName = 'tab-index-changed';

export type TabIndexChangedPayload = {
  index: number;
  paneId: string;
};

export class TabIndexChangedEvent extends CustomEvent<TabIndexChangedPayload> {
  constructor(detail: TabIndexChangedPayload) {
    super(tabIndexChangedEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
