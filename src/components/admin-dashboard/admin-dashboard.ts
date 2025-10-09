import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/data-manager/data-manager';
import '@/components/entity-config-list/entity-config-list';

import { ViewElement } from '@/lib/ViewElement';

@customElement('admin-dashboard')
export class AdminDashboard extends ViewElement {
  render() {
    return html`
      <div class="admin-dashboard">
        <data-manager></data-manager>
        <entity-config-list></entity-config-list>
      </div>
    `;
  }
}
