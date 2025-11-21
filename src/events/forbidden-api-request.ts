export const forbiddenApiRequestEventName = 'forbidden-api-request';

export interface ForbiddenApiRequestEventPayload {
  url: string;
}

export class ForbiddenApiRequestEvent extends CustomEvent<ForbiddenApiRequestEventPayload> {
  constructor(payload: ForbiddenApiRequestEventPayload) {
    super(forbiddenApiRequestEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
