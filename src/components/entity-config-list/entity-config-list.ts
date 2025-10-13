import { html, css, TemplateResult } from 'lit';
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
import {
  EntityConfigDeletedEvent,
  EntityConfigUpdatedEvent,
} from '../entity-config-form/entity-config-form.events';
import { repeat } from 'lit/directives/repeat.js';
import { CollapsableToggledEvent } from '@ss/ui/components/ss-collapsable.events';

@customElement('entity-config-list')
export class EntityConfigList extends ViewElement {
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

  async loadEntityConfigs(): Promise<void> {
    const entityConfigs = await storage.getEntityConfigs();
    if (entityConfigs) {
      this.state.setEntityConfigs(entityConfigs);
    }
    this.ready = true;
  }

  addEntityConfig(): void {
    const entityConfig = produce(defaultEntityConfig, draft => draft);

    this.state.setEntityConfigs([...this.state.entityConfigs, entityConfig]);
  }

  handleEntityConfigDeleted(e: EntityConfigDeletedEvent): void {
    this.state.setEntityConfigs(
      this.state.entityConfigs.filter(config => config.id !== e.detail.id),
    );
  }

  handleEntityConfigUpdated(e: EntityConfigUpdatedEvent, index: number): void {
    const updatedConfigs = produce(toJS(this.state.entityConfigs), draft => {
      draft[index] = e.detail;
    });

    this.dispatchEvent(
      new CollapsableToggledEvent({
        isOpen: true,
        panelId: `entityConfigForm-${e.detail.id}`,
      }),
    );
    this.state.setEntityConfigs(updatedConfigs);
  }

  isPanelOpen(id: number): boolean {
    if (!id) {
      return true;
    }

    return this.state.collapsablePanelState[`entityConfigForm-${id}`] || false;
  }

  render(): TemplateResult {
    return html`
      <div class="admin-dashboard box">
        ${repeat(
          this.state.entityConfigs,
          config => config.id,
          (config, index) => html`
            <entity-config-form
              entityConfigId=${config.id}
              name=${config.name}
              description=${config.description}
              .properties=${toJS(config.properties)}
              ?allowPropertyOrdering=${config.allowPropertyOrdering}
              ?open=${this.isPanelOpen(config.id)}
              @entity-config-deleted=${this.handleEntityConfigDeleted}
              @entity-config-updated=${(e: EntityConfigUpdatedEvent): void =>
                this.handleEntityConfigUpdated(e, index)}
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
