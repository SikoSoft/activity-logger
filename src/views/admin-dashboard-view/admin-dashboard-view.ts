import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/admin-dashboard/admin-dashboard';
import '@/components/login-form/login-form';
import '@/components/logged-in/logged-in';
import '@/components/logged-out/logged-out';
import '@/components/user-header/user-header';
import { ViewElement } from '@/lib/ViewElement';

@customElement('admin-dashboard-view')
export class AdminDashboardView extends ViewElement {
  render(): TemplateResult {
    return html` <user-header></user-header>
      <logged-out
        ><template><login-form></login-form></template
      ></logged-out>
      <logged-in
        ><template><admin-dashboard></admin-dashboard></template
      ></logged-in>`;
  }
}
