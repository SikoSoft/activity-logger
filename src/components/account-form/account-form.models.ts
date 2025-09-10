export enum AccountFormField {
  USERNAME = 'username',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export type AccountFormFieldName = `${AccountFormField}`;

export const passwordFields: AccountFormFieldName[] = [
  AccountFormField.PASSWORD,
  AccountFormField.PASSWORD_REPEAT,
];

export interface CreateAccountRequestBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateAccountResponseBody {
  id: string;
}
