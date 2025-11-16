import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { storage } from '@/lib/Storage';

@customElement('logged-in')
export class LoggedIn extends LitElement {
  isLoggedIn(): boolean {
    return storage.getAuthToken() !== '';
  }

  render(): TemplateResult | typeof nothing {
    if (this.isLoggedIn()) {
      return html`<slot></slot>`;
    }

    return nothing;
  }
}
