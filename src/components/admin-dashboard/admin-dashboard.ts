import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  AdminDashboardProps,
  adminDashboardProps,
} from './admin-dashboard.models';

import '@/components/entity-config-form/entity-config-form';

import { theme } from '@/styles/theme';

@customElement('admin-dashboard')
export class AdminDashboard extends LitElement {
  @state() private props: AdminDashboardProps = adminDashboardProps;

  static styles = [theme, css``];

  render() {
    return html`
      <div class="admin-dashboard box">
        <entity-config-form></entity-config-form>
      </div>
    `;
  }
}
