import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@/components/login-form';

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

  render() {
    return html`
      <div class="box forbidden">
        <div class="message">${msg('You need to login to view this.')}</div>

        <div class="login-form">
          <login-form></login-form>
        </div>
      </div>
    `;
  }
}
