import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { translate } from '@/lib/Localization';
import { appState } from '@/state';
import { api } from '@/lib/Api';
import { storage } from '@/lib/Storage';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import { UserLoggedOutEvent } from '@/events/user-logged-out';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import { themed } from '@/lib/Theme';

@themed()
@customElement('user-pane')
export class UserPane extends MobxLitElement {
  static styles = css`
    .box {
      padding: 1rem;
      margin-bottom: 1rem;
    }
  `;

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
      addToast(translate('youAreNowLoggedOut'), NotificationType.INFO);
      this.dispatchEvent(new UserLoggedOutEvent({}));
    }
  }

  render(): TemplateResult {
    return html`
      <div>
        <ss-button @click=${this.logout}>${translate('logout')}</ss-button>
      </div>
    `;
  }
}
