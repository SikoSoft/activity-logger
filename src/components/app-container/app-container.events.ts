export const viewReadyEventName = 'view-ready';

export type ViewReadyPayload = Record<string, never>;

export class ViewReadyEvent extends CustomEvent<ViewReadyPayload> {
  constructor(detail: ViewReadyPayload) {
    super(viewReadyEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
