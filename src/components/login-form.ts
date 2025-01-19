import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { InputSubmittedEvent } from '@ss/ui/events/input-submitted';

import { theme } from '@/styles/theme';
import { api } from '@/lib/Api';
import { LoginRequestBody, LoginResponseBody } from '@/models/Identity';
import { storage } from '@/lib/Storage';

@customElement('login-form')
export class LoginForm extends MobxLitElement {
  static styles = [
    theme,
    css`
      .box {
        padding: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ];

  private state = appState;

  @state() username: string = '';
  @state() password: string = '';

  private _handleUsernameChanged(e: InputChangedEvent): void {
    this.username = e.detail.value;
  }

  private _handleUsernameSubmitted(e: InputSubmittedEvent): void {
    this._login();
  }

  private _handlePasswordChanged(e: InputChangedEvent): void {
    this.password = e.detail.value;
  }

  private _handlePasswordSubmitted(e: InputSubmittedEvent): void {
    this._login();
  }

  private async _login(): Promise<void> {
    console.log('_login');
    const result = await api.post<LoginRequestBody, LoginResponseBody>(
      'login',
      { username: this.username, password: this.password },
    );

    if (result) {
      storage.setAuthToken(result.response.authToken);
      api.setAuthToken(result.response.authToken);
      this.state.setForbidden(false);
    }
  }

  render() {
    return html`
      <form>
        <ss-input
          id="username"
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>
        <ss-input
          id="password"
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>
        <ss-button @click=${this._login} text=${msg('login')}></ss-button>
      </form>
    `;
  }
}
