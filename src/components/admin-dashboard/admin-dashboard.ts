import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@/components/data-manager/data-manager';
import '@/components/entity-config-list/entity-config-list';

import { ViewElement } from '@/lib/ViewElement';

@customElement('admin-dashboard')
export class AdminDashboard extends ViewElement {
  static styles = css`
    .admin-dashboard {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
  `;

  render(): TemplateResult {
    return html`
      <div class="admin-dashboard">
        <data-manager></data-manager>
        <entity-config-list></entity-config-list>
      </div>
    `;
  }
}
