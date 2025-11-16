import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { storage } from '@/lib/Storage';

@customElement('logged-out')
export class LoggedOut extends LitElement {
  isLoggedOut(): boolean {
    return storage.getAuthToken() === '';
  }

  render(): TemplateResult | typeof nothing {
    if (this.isLoggedOut()) {
      return html`<slot></slot>`;
    }

    return nothing;
  }
}
