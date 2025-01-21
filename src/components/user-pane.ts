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

@customElement('user-pane')
export class UserPane extends MobxLitElement {
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

  private async _logout(): Promise<void> {
    const result = await api.get<unknown>('logout');
    if (result) {
      storage.setAuthToken('');
      api.setAuthToken('');
      this.state.setAuthToken('');
      this.state.setForbidden(true);
      this.state.addToast(msg('You are now logged out.'));
    }
  }

  render() {
    return html`
      <div>
        <button @click=${this._logout}>${msg('Logout')}</button>
      </div>
    `;
  }
}
