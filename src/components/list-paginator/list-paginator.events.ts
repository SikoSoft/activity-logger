export const pageChangedEventName = 'page-changed';

export interface PageChangedEventPayload {
  start: number;
}

export class PageChangedEvent extends CustomEvent<PageChangedEventPayload> {
  constructor(payload: PageChangedEventPayload) {
    super(pageChangedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
