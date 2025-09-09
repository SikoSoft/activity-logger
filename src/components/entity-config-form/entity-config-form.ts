import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  defaultEntityConfig,
  defaultEntityPropertyConfig,
  EntityConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { msg } from '@lit/localize';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { storage } from '@/lib/Storage';

import '@/components/property-config-form/property-config-form';
import {
  PropertyConfigAddedEvent,
  PropertyConfigUpdatedEvent,
} from '../property-config-form/property-config-form.events';
import { produce } from 'immer';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import {
  EntityConfigFormProp,
  entityConfigFormProps,
  EntityConfigFormProps,
} from './entity-config-form.models';
import { repeat } from 'lit/directives/repeat.js';

@customElement('entity-config-form')
export class EntityConfigForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    .field {
      margin-bottom: 1rem;
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }

    property-config-form {
      display: block;
      margin-bottom: 1rem;
    }
  `;

  @state()
  entityConfig: EntityConfig = defaultEntityConfig;

  @property({ type: Number })
  [EntityConfigFormProp.ENTITY_CONFIG_ID]: EntityConfigFormProps[EntityConfigFormProp.ENTITY_CONFIG_ID] =
    entityConfigFormProps[EntityConfigFormProp.ENTITY_CONFIG_ID].default;

  @property({ type: String })
  [EntityConfigFormProp.NAME]: EntityConfigFormProps[EntityConfigFormProp.NAME] =
    entityConfigFormProps[EntityConfigFormProp.NAME].default;

  @property({ type: String })
  [EntityConfigFormProp.DESCRIPTION]: EntityConfigFormProps[EntityConfigFormProp.DESCRIPTION] =
    entityConfigFormProps[EntityConfigFormProp.DESCRIPTION].default;

  @property({ type: Array })
  [EntityConfigFormProp.PROPERTIES]: EntityConfigFormProps[EntityConfigFormProp.PROPERTIES] =
    entityConfigFormProps[EntityConfigFormProp.PROPERTIES].default;

  connectedCallback(): void {
    super.connectedCallback();
    this.entityConfig = {
      id: this[EntityConfigFormProp.ENTITY_CONFIG_ID],
      name: this[EntityConfigFormProp.NAME],
      description: this[EntityConfigFormProp.DESCRIPTION],
      properties: this[EntityConfigFormProp.PROPERTIES],
    };
  }

  updateName(name: string) {
    this.entityConfig = { ...this.entityConfig, name };
  }

  updateDescription(description: string) {
    this.entityConfig = { ...this.entityConfig, description };
  }

  validate() {
    const errors: string[] = [];
    if (!this.entityConfig.name) {
      errors.push(msg('entityConfigNameRequired'));
    }
    return errors;
  }

  async save() {
    const validationErrors = this.validate();
    if (validationErrors.length > 0) {
      addToast(msg('entityConfigValidationFailed'), NotificationType.ERROR);
      return;
    }

    let result: unknown;

    if (this.entityConfig.id) {
      result = await storage.updateEntityConfig(this.entityConfig);
    } else {
      result = await storage.addEntityConfig(this.entityConfig);
    }

    if (!result) {
      addToast(msg('failedToSaveEntityConfig'), NotificationType.ERROR);
      return;
    }

    addToast(msg('entityConfigSaved'), NotificationType.SUCCESS);
  }

  addPropertyToTop() {
    console.log({ defaultEntityPropertyConfig });
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.unshift({ ...defaultEntityPropertyConfig });
    });
    this.entityConfig = entityConfig;
  }

  addPropertyToBottom() {
    console.log({ defaultEntityPropertyConfig });
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.push({ ...defaultEntityPropertyConfig });
    });
    this.entityConfig = entityConfig;
  }

  updateProperty(index: number, updatedProperty: EntityPropertyConfig) {
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties[index] = updatedProperty;
    });
    this.entityConfig = entityConfig;
  }

  deleteProperty(index: number) {
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.splice(index, 1);
    });
    this.entityConfig = entityConfig;
  }

  render() {
    return html`
      <div class="entity-config-form">
        <div class="field">
          <label for="entity-name">${msg('Entity Name')}</label>
          <ss-input
            id="entity-name"
            .value=${this.entityConfig.name}
            @input-changed=${(e: InputChangedEvent) =>
              this.updateName(e.detail.value)}
          ></ss-input>
        </div>

        <div class="field">
          <label for="entity-description">${msg('Entity Description')}</label>
          <ss-input
            id="entity-description"
            .value=${this.entityConfig.description}
            @input-changed=${(e: InputChangedEvent) =>
              this.updateDescription(e.detail.value)}
          ></ss-input>
        </div>

        <div class="buttons">
          <ss-button positive @click=${this.save}>${msg('Save')}</ss-button>
        </div>

        <div class="properties">
          <ss-button @click=${this.addPropertyToTop}
            >${msg('Add Property')}</ss-button
          >

          ${repeat(
            this.entityConfig.properties,
            (property, index) => property.id,
            (property, index) => html`
              <property-config-form
                entityConfigId=${this.entityConfig.id}
                propertConfigId=${property.id}
                dataType=${property.dataType}
                renderType=${property.renderType}
                propertyConfigId=${property.id}
                name=${property.name}
                required=${property.required}
                repeat=${property.repeat}
                allowed=${property.allowed}
                prefix=${property.prefix}
                suffix=${property.suffix}
                @property-config-updated=${(e: PropertyConfigUpdatedEvent) =>
                  this.updateProperty(index, e.detail)}
                @property-config-added=${(e: PropertyConfigAddedEvent) =>
                  this.updateProperty(index, e.detail)}
                @property-config-deleted=${() => {
                  this.deleteProperty(index);
                }}
              ></property-config-form>
            `,
          )}
          ${this.entityConfig.properties.length > 0
            ? html` <ss-button @click=${this.addPropertyToBottom}
                >${msg('Add Property')}</ss-button
              >`
            : nothing}
        </div>
      </div>
    `;
  }
}
