import { LitElement, html, css } from 'lit';
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
import { PropertyConfigUpdatedEvent } from '../property-config-form/property-config-form.events';
import { produce } from 'immer';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import {
  EntityConfigFormProp,
  entityConfigFormProps,
  EntityConfigFormProps,
} from './entity-config-form.models';

@customElement('entity-config-form')
export class EntityConfigForm extends LitElement {
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

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

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

  addProperty() {
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

        <div class="properties">
          ${this.entityConfig.properties.map(
            (property, index) => html`
              <property-config-form
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
              ></property-config-form>
            `,
          )}
        </div>

        <div class="actions">
          <ss-button @click=${this.addProperty}
            >${msg('Add Property')}</ss-button
          >
          <ss-button @click=${this.save}>${msg('Save')}</ss-button>
        </div>
      </div>
    `;
  }
}
