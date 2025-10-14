import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translate } from '@/lib/Localization';

import { api } from '@/lib/Api';
import {
  AccountFormField,
  AccountFormFieldName,
  CreateAccountRequestBody,
  CreateAccountResponseBody,
  passwordFields,
} from './account-form.models';
import { InputType } from '@ss/ui/components/ss-input.models';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import {
  InputChangedEvent,
  InputSubmittedEvent,
} from '@ss/ui/components/ss-input.events';
import { AccountCreatedEvent } from './account-form.events';

import { theme } from '@/styles/theme';

@customElement('account-form')
export class AccountForm extends LitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ];

  @state() username: string = '';
  @state() password: string = '';
  @state() passwordRepeat: string = '';
  @state() firstName: string = '';
  @state() lastName: string = '';
  @state() loading: boolean = false;

  @state()
  get isValid(): boolean {
    return (
      this.username.length > 0 &&
      this.password.length > 0 &&
      this.password === this.passwordRepeat &&
      this.firstName.length > 0 &&
      this.lastName.length > 0
    );
  }

  private reset(): void {
    this.username = '';
    this.password = '';
    this.passwordRepeat = '';
    this.firstName = '';
    this.lastName = '';
  }

  private handleFieldChanged(
    fieldName: AccountFormFieldName,
    e: InputChangedEvent,
  ): void {
    this[fieldName] = e.detail.value;
  }

  private handleFieldSubmitted(_e: InputSubmittedEvent): void {
    this.save();
  }

  private async save(): Promise<void> {
    if (!this.isValid) {
      return;
    }

    this.loading = true;
    const result = await api.post<
      CreateAccountRequestBody,
      CreateAccountResponseBody
    >('user', {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    });

    if (result && result.status !== 401) {
      this.dispatchEvent(new AccountCreatedEvent({ id: result.response.id }));
      this.reset();
    }

    this.loading = false;
  }

  render(): TemplateResult {
    return html`
      <form class="box">
        ${Object.values(AccountFormField).map(
          fieldName =>
            html` <ss-input
              type=${passwordFields.includes(fieldName)
                ? InputType.PASSWORD
                : InputType.TEXT}
              id=${fieldName}
              placeholder=${fieldName}
              @input-submitted=${this.handleFieldSubmitted}
              @input-changed=${(e: InputChangedEvent): void => {
                this.handleFieldChanged(fieldName, e);
              }}
              value=${this[fieldName]}
            ></ss-input>`,
        )}

        <ss-button
          @click=${this.save}
          text=${translate('createAccount')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
