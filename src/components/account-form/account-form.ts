import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { InputSubmittedEvent } from '@ss/ui/events/input-submitted';

import { theme } from '@/styles/theme';
import { api } from '@/lib/Api';
import {
  AccountFormField,
  AccountFormFieldName,
  CreateAccountRequestBody,
  CreateAccountResponseBody,
  passwordFields,
} from './account-form.models';
import { Input } from '@ss/ui/models';
import { AccountCreatedEvent } from './account-form.events';

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

  private handleFieldSubmitted(e: InputSubmittedEvent): void {
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

  render() {
    return html`
      <form class="box">
        ${Object.values(AccountFormField).map(
          fieldName =>
            html` <ss-input
              type=${passwordFields.includes(fieldName)
                ? Input.InputType.PASSWORD
                : Input.InputType.TEXT}
              id=${fieldName}
              placeholder=${fieldName}
              @input-submitted=${this.handleFieldSubmitted}
              @input-changed=${(e: InputChangedEvent) => {
                this.handleFieldChanged(fieldName, e);
              }}
              value=${this[fieldName]}
            ></ss-input>`,
        )}

        <ss-button
          @click=${this.save}
          text=${msg('Create Account')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
