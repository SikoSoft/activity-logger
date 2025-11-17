import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/entity-form/entity-form';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';

@customElement('entity-form-view')
export class EntityFormView extends LitElement {
  render(): TemplateResult {
    return html` <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><entity-form></entity-form></template
      ></logged-in>`;
  }
}
