import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/admin-dashboard/admin-dashboard';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';

@customElement('admin-dashboard-view')
export class AdminDashboardView extends LitElement {
  render(): TemplateResult {
    return html` <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><admin-dashboard></admin-dashboard></template
      ></logged-in>`;
  }
}
