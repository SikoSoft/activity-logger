export const userLoggedOutEventName = 'user-logged-out';

export interface UserLoggedOutEventPayload {}

export class UserLoggedOutEvent extends CustomEvent<UserLoggedOutEventPayload> {
  constructor(payload: UserLoggedOutEventPayload) {
    super(userLoggedOutEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
