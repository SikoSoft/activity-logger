import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { toJS } from 'mobx';

import { translate } from '@/lib/Localization';
import { storage } from '@/lib/Storage';
import { appState } from '@/state';

import '@ss/ui/components/ss-button';
import '@/components/entity-config-form/entity-config-form';

import { theme } from '@/styles/theme';
import { produce } from 'immer';
import { defaultEntityConfig } from 'api-spec/models/Entity';
import { ViewElement } from '@/lib/ViewElement';
import { EntityConfigDeletedEvent } from '../entity-config-form/entity-config-form.events';
import { repeat } from 'lit/directives/repeat.js';

@customElement('admin-dashboard')
export class AdminDashboard extends ViewElement {
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
    this.ready = true;
  }

  addEntityConfig() {
    const entityConfig = produce(defaultEntityConfig, draft => draft);

    this.state.setEntityConfigs([...this.state.entityConfigs, entityConfig]);
  }

  handleEntityConfigDeleted(e: EntityConfigDeletedEvent) {
    this.state.setEntityConfigs(
      this.state.entityConfigs.filter(config => config.id !== e.detail.id),
    );
  }

  isPanelOpen(id: number): boolean {
    if (!id) {
      return true;
    }

    return this.state.collapsablePanelState[`entityConfigForm-${id}`] || false;
  }

  render() {
    return html`
      <div class="admin-dashboard box">
        ${repeat(
          this.state.entityConfigs,
          config => config.id,
          config => html`
            <entity-config-form
              entityConfigId=${config.id}
              name=${config.name}
              description=${config.description}
              .properties=${toJS(config.properties)}
              ?open=${this.isPanelOpen(config.id)}
              @entity-config-deleted=${this.handleEntityConfigDeleted}
            ></entity-config-form>
          `,
        )}

        <div class="buttons">
          <ss-button @click=${this.addEntityConfig}>
            ${translate('addEntityConfig')}
          </ss-button>
        </div>
      </div>
    `;
  }
}
