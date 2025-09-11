import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { toJS } from 'mobx';

import { storage } from '@/lib/Storage';
import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@/components/entity-config-form/entity-config-form';

import { theme } from '@/styles/theme';
import { produce } from 'immer';
import { defaultEntityConfig } from 'api-spec/models/Entity';
import { msg } from '@lit/localize';

@customElement('admin-dashboard')
export class AdminDashboard extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .buttons {
        padding: 1rem;
      }
    `,
  ];

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

  addEntityConfig() {
    const entityConfig = produce(defaultEntityConfig, draft => draft);

    this.state.setEntityConfigs([...this.state.entityConfigs, entityConfig]);
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
              ?open=${!config.id}
            ></entity-config-form>
          `,
        )}

        <div class="buttons">
          <ss-button @click=${this.addEntityConfig}>
            ${msg('Add Entity Config')}
          </ss-button>
        </div>
      </div>
    `;
  }
}
