import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { translate } from '@/lib/Localization';

import '@/components/login-form/login-form';

import { theme } from '@/styles/theme';

@customElement('forbidden-notice')
export class ForbiddenNotice extends LitElement {
  static styles = [
    theme,
    css`
      .forbidden {
        text-align: center;

        .message {
          padding: 1rem;
        }

        .login-form {
          padding: 1rem;
        }
      }
    `,
  ];

  render(): TemplateResult {
    return html`
      <div class="box forbidden">
        <div class="message">${translate('forbiddenMessage')}</div>

        <div class="login-form">
          <login-form></login-form>
        </div>
      </div>
    `;
  }
}
