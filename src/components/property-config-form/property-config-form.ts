import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { msg } from '@lit/localize';
import { produce } from 'immer';

import { ControlType, SelectControl } from '@/models/Control';
import { storage } from '@/lib/Storage';
import { addToast } from '@/lib/Util';
import {
  PropertyConfigFormProp,
  propertyConfigFormProps,
  PropertyConfigFormProps,
} from './property-config-form.models';

import { InputChangedEvent } from '@ss/ui/events/input-changed';
import {
  PropertyConfigAddedEvent,
  PropertyConfigDeletedEvent,
  PropertyConfigUpdatedEvent,
} from './property-config-form.events';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@ss/ui/components/confirmation-modal';

@customElement('property-config-form')
export class PropertyConfigForm extends LitElement {
  @state() propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    fieldset {
      border-radius: 0.5rem;
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  `;

  @property({ type: String })
  [PropertyConfigFormProp.DATA_TYPE]: PropertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE] =
    propertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE].default;

  @property({ type: String })
  [PropertyConfigFormProp.RENDER_TYPE]: PropertyConfigFormProps[PropertyConfigFormProp.RENDER_TYPE] =
    propertyConfigFormProps[PropertyConfigFormProp.RENDER_TYPE].default;

  @property({ type: Number })
  [PropertyConfigFormProp.ENTITY_CONFIG_ID]: PropertyConfigFormProps[PropertyConfigFormProp.ENTITY_CONFIG_ID] =
    propertyConfigFormProps[PropertyConfigFormProp.ENTITY_CONFIG_ID].default;

  @property({ type: Number })
  [PropertyConfigFormProp.PROPERTY_CONFIG_ID]: PropertyConfigFormProps[PropertyConfigFormProp.PROPERTY_CONFIG_ID] =
    propertyConfigFormProps[PropertyConfigFormProp.PROPERTY_CONFIG_ID].default;

  @property({ type: String })
  [PropertyConfigFormProp.NAME]: PropertyConfigFormProps[PropertyConfigFormProp.NAME] =
    propertyConfigFormProps[PropertyConfigFormProp.NAME].default;

  @property({ type: Number })
  [PropertyConfigFormProp.REQUIRED]: PropertyConfigFormProps[PropertyConfigFormProp.REQUIRED] =
    propertyConfigFormProps[PropertyConfigFormProp.REQUIRED].default;

  @property({ type: Number })
  [PropertyConfigFormProp.REPEAT]: PropertyConfigFormProps[PropertyConfigFormProp.REPEAT] =
    propertyConfigFormProps[PropertyConfigFormProp.REPEAT].default;

  @property({ type: Number })
  [PropertyConfigFormProp.ALLOWED]: PropertyConfigFormProps[PropertyConfigFormProp.ALLOWED] =
    propertyConfigFormProps[PropertyConfigFormProp.ALLOWED].default;

  @property({ type: String })
  [PropertyConfigFormProp.PREFIX]: PropertyConfigFormProps[PropertyConfigFormProp.PREFIX] =
    propertyConfigFormProps[PropertyConfigFormProp.PREFIX].default;

  @property({ type: String })
  [PropertyConfigFormProp.SUFFIX]: PropertyConfigFormProps[PropertyConfigFormProp.SUFFIX] =
    propertyConfigFormProps[PropertyConfigFormProp.SUFFIX].default;

  @state()
  confirmationModalIsOpen = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.propertyConfig = {
      ...this.updatedPropertyConfig,
      ...Object.keys(defaultEntityPropertyConfig).reduce((acc: any, field) => {
        acc[field] = this[field as keyof this];
        return acc;
      }, defaultEntityPropertyConfig as EntityPropertyConfig),
      id: this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
    };
  }

  get visibleFields(): PropertyConfigFormProp[] {
    return Object.values(PropertyConfigFormProp).filter(field => {
      const control = propertyConfigFormProps[field].control;
      return control.type !== ControlType.HIDDEN;
    }) as PropertyConfigFormProp[];
  }

  validate() {
    const errors: string[] = [];

    return errors;
  }

  updateField(
    field: PropertyConfigFormProp,
    rawValue: string | number | boolean,
  ) {
    let value = rawValue;
    if (propertyConfigFormProps[field].control.type === ControlType.NUMBER) {
      value = Number(value) || 0;
    }

    const propertyConfig = produce(this.propertyConfig, draft => ({
      ...draft,
      [field]: value,
    }));

    this.propertyConfig = propertyConfig;
  }

  get updatedPropertyConfig(): EntityPropertyConfig {
    return {
      id: this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
      entityConfigId: this[PropertyConfigFormProp.ENTITY_CONFIG_ID],
      dataType: this[
        PropertyConfigFormProp.DATA_TYPE
      ] as EntityPropertyConfig['dataType'],
      renderType: this[
        PropertyConfigFormProp.RENDER_TYPE
      ] as EntityPropertyConfig['renderType'],
      name: this[PropertyConfigFormProp.NAME] as EntityPropertyConfig['name'],
      required: this[
        PropertyConfigFormProp.REQUIRED
      ] as EntityPropertyConfig['required'],
      repeat: this[
        PropertyConfigFormProp.REPEAT
      ] as EntityPropertyConfig['repeat'],
      allowed: this[
        PropertyConfigFormProp.ALLOWED
      ] as EntityPropertyConfig['allowed'],
      prefix: this[
        PropertyConfigFormProp.PREFIX
      ] as EntityPropertyConfig['prefix'],
      suffix: this[
        PropertyConfigFormProp.SUFFIX
      ] as EntityPropertyConfig['suffix'],
    };
  }

  async save() {
    console.log('Saving property config', this.propertyConfig);
    if (this[PropertyConfigFormProp.PROPERTY_CONFIG_ID]) {
      const propertyConfig = await storage.updatePropertyConfig(
        this.propertyConfig,
      );
      if (propertyConfig) {
        addToast(msg('Property configuration updated successfully.'));
        this.dispatchEvent(new PropertyConfigUpdatedEvent(propertyConfig));
      }
    } else {
      const propertyConfig = await storage.addPropertyConfig(
        this.propertyConfig,
      );
      if (propertyConfig) {
        addToast(msg('Property configuration added successfully.'));
        this.dispatchEvent(new PropertyConfigAddedEvent(propertyConfig));
      }
    }
  }

  async delete() {
    this.confirmationModalIsOpen = false;

    const deleteResult = await storage.deletePropertyConfig(
      this[PropertyConfigFormProp.ENTITY_CONFIG_ID],
      this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
    );

    if (deleteResult) {
      addToast(msg('Property configuration deleted successfully.'));
      this.dispatchEvent(
        new PropertyConfigDeletedEvent(
          this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
        ),
      );
    }
  }

  get inSync(): boolean {
    if (!this[PropertyConfigFormProp.PROPERTY_CONFIG_ID]) {
      return false;
    }

    return (
      JSON.stringify(this.updatedPropertyConfig) ===
      JSON.stringify(this.propertyConfig)
    );
  }

  render() {
    return html`
      <fieldset class="entity-config-form">
        <legend>${msg('Property Configuration')}</legend>

      ${this.visibleFields.map(
        field =>
          html` <div class="field">
            <label for=${field}>${msg(field)}</label>
            ${propertyConfigFormProps[field].control.type === ControlType.SELECT
              ? html`
                  <ss-select
                    .options=${(
                      propertyConfigFormProps[field].control as SelectControl
                    ).options.map(option => ({
                      label: msg(option),
                      value: option,
                    }))}
                    selected=${this[field]}
                    @select-changed=${(e: InputChangedEvent) => {
                      this.updateField(field, e.detail.value);
                    }}
                  ></ss-select>
                `
              : html`
                  <ss-input
                    type=${propertyConfigFormProps[field].control.type}
                    value=${this[field]}
                    @input-changed=${(e: InputChangedEvent) => {
                      this.updateField(field, e.detail.value);
                    }}
                  ></ss-input>
                `}
          </div>`,
      )}
        </div>
      </fieldset>
      <div class="buttons">
        <ss-button positive ?disabled=${this.inSync} @click=${() => {
          this.save();
        }}>
          ${msg('Save')}
        </ss-button>
        <ss-button negative ?disabled=${!this[PropertyConfigFormProp.PROPERTY_CONFIG_ID]} @click=${() => {
          this.confirmationModalIsOpen = true;
        }}>
          ${msg('Delete')}
        </ss-button>
      </div>
      <confirmation-modal 
        ?open=${this.confirmationModalIsOpen}
        @confirmation-accepted=${this.delete}
        @confirmation-declined=${() => {
          this.confirmationModalIsOpen = false;
        }}></confirmation-modal>

      `;
  }
}
