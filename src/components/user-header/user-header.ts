import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('user-header')
export class UserHeader extends LitElement {
  render(): TemplateResult {
    return html`<logged-in>
      <template>
        <list-config></list-config>

        <page-nav></page-nav>

        <bulk-manager></bulk-manager>

        <floating-widget></floating-widget>
      </template>
    </logged-in>`;
  }
}
