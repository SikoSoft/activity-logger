import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  defaultEntityConfig,
  defaultEntityPropertyConfig,
  EntityConfig,
  EntityPropertyConfig,
} from '@/models/Entity';
import { msg } from '@lit/localize';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { storage } from '@/lib/Storage';

import '@/components/property-config-form/property-config-form';
import { PropertyConfigUpdatedEvent } from '../property-config-form/property-config-form.events';
import { produce } from 'immer';

@customElement('entity-config-form')
export class EntityConfigForm extends LitElement {
  @state()
  entityConfig: EntityConfig = defaultEntityConfig;

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  updateName(name: string) {
    console.info(`Entity name updated: ${name}`);
    this.entityConfig = { ...this.entityConfig, name };
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
      console.log(
        `Entity config validation failed: ${validationErrors.join(', ')}`,
      );
      return;
    }

    console.info(`Entity config saved: ${JSON.stringify(this.entityConfig)}`);

    if (this.entityConfig.id) {
      await storage.updateEntityConfig(this.entityConfig);
    } else {
      await storage.addEntityConfig(this.entityConfig);
    }
  }

  addProperty() {
    console.log('Add property clicked');
    // this.entityConfig.properties.push({ ...defaultEntityPropertyConfig });
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.push({ ...defaultEntityPropertyConfig });
    });
    this.entityConfig = entityConfig;
  }

  updateProperty(index: number, updatedProperty: EntityPropertyConfig) {
    console.info(
      `Property at index ${index} updated: ${JSON.stringify(updatedProperty)}`,
    );
    //this.entityConfig.properties[index] = updatedProperty;
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

        <div class="properties">
          ${this.entityConfig.properties.map(
            (property, index) => html`
              <property-config-form
                .propertyConfig=${property}
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
