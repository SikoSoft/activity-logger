import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { theme } from '@/styles/theme';
import { api } from '@/lib/Api';
import { storage } from '@/lib/Storage';
import { UserLoggedOutEvent } from '@/events/user-logged-out';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

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

  private async logout(): Promise<void> {
    const result = await api.get<unknown>('logout');
    if (result) {
      storage.setAuthToken('');
      api.setAuthToken('');
      this.state.setAuthToken('');
      this.state.setForbidden(true);
      addToast(msg('You are now logged out.'), NotificationType.INFO);
      this.dispatchEvent(new UserLoggedOutEvent({}));
    }
  }

  render() {
    return html`
      <div>
        <button @click=${this.logout}>${msg('Logout')}</button>
      </div>
    `;
  }
}
