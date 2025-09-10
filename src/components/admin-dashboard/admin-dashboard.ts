import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { toJS } from 'mobx';

import {
  AdminDashboardProps,
  adminDashboardProps,
} from './admin-dashboard.models';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';

import '@/components/entity-config-form/entity-config-form';

import { theme } from '@/styles/theme';

@customElement('admin-dashboard')
export class AdminDashboard extends MobxLitElement {
  private state = appState;

  @state() private props: AdminDashboardProps = adminDashboardProps;

  static styles = [theme, css``];

  connectedCallback(): void {
    super.connectedCallback();
    this.loadEntityConfigs();
  }

  async loadEntityConfigs() {
    const entityConfigs = await storage.getEntityConfigs();
    if (entityConfigs) {
      this.state.setEntityConfigs(entityConfigs);
    }
  }

  render() {
    return html`
      <div class="admin-dashboard box">
        ${this.state.entityConfigs.map(
          config => html`
            <entity-config-form
              entityConfigId=${config.id}
              name=${config.name}
              description=${config.description}
              .properties=${toJS(config.properties)}
            ></entity-config-form>
          `,
        )}
      </div>
    `;
  }
}
