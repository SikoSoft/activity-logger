export const userLoggedInEventName = 'user-logged-in';

export interface UserLoggedInEventPayload {}

export class UserLoggedInEvent extends CustomEvent<UserLoggedInEventPayload> {
  constructor(payload: UserLoggedInEventPayload) {
    super(userLoggedInEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
