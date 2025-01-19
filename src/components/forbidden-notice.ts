import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@/components/login-form';

import { theme } from '@/styles/theme';

@customElement('forbidden-notice')
export class ForbiddenNotice extends LitElement {
  render() {
    return html`
      <div>
        ${msg('forbidden')}

        <login-form></login-form>
      </div>
    `;
  }
}
