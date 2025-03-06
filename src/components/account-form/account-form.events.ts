export const accountCreatedEventName = 'account-created';

export interface AccountCreatedEventPayload {
  id: string;
}

export class AccountCreatedEvent extends CustomEvent<AccountCreatedEventPayload> {
  constructor(payload: AccountCreatedEventPayload) {
    super(accountCreatedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
