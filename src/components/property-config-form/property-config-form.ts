import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  BooleanDataValue,
  DataType,
  DataTypedValue,
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
  ImageDataValue,
  IntDataValue,
  LongTextDataValue,
  PropertyDataValue,
  ShortTextDataValue,
} from 'api-spec/models/Entity';
import { produce } from 'immer';

import { ControlType, SelectControl } from '@/models/Control';
import { storage } from '@/lib/Storage';
import { addToast } from '@/lib/Util';
import {
  PropertyConfigFormProp,
  propertyConfigFormProps,
  PropertyConfigFormProps,
} from './property-config-form.models';

import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import {
  PropertyConfigAddedEvent,
  PropertyConfigDeletedEvent,
  PropertyConfigUpdatedEvent,
} from './property-config-form.events';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@ss/ui/components/confirmation-modal';
import '@ss/ui/components/ss-toggle';
import '@/components/entity-form/image-field/image-field';
import { ToggleChangedEvent } from '@ss/ui/components/ss-toggle.events';
import { PropertyChangedEvent } from '../entity-form/property-field/property-field.events';
import { repeat } from 'lit/directives/repeat.js';
import { translate } from '@/lib/Localization';

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

    .field {
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.25rem;
      }
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  [PropertyConfigFormProp.OPEN]: PropertyConfigFormProps[PropertyConfigFormProp.OPEN] =
    propertyConfigFormProps[PropertyConfigFormProp.OPEN].default;

  @property({ type: String })
  [PropertyConfigFormProp.DATA_TYPE]: PropertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE] =
    propertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE].default;

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

  @property({ type: Boolean })
  [PropertyConfigFormProp.HIDDEN]: PropertyConfigFormProps[PropertyConfigFormProp.HIDDEN] =
    propertyConfigFormProps[PropertyConfigFormProp.HIDDEN].default;

  @property()
  [PropertyConfigFormProp.DEFAULT_VALUE]: PropertyConfigFormProps[PropertyConfigFormProp.DEFAULT_VALUE] =
    propertyConfigFormProps[PropertyConfigFormProp.DEFAULT_VALUE].default;

  @state()
  confirmationModalIsOpen = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.propertyConfig = produce(this.updatedPropertyConfig, draft => draft);
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('propertyConfig')) {
      const changedPropertyConfig = changedProperties.get(
        'propertyConfig',
      ) as EntityPropertyConfig | null;

      if (changedPropertyConfig) {
        if (this.dataType !== changedPropertyConfig.dataType) {
          //this.handleDataTypeChange();
        }
      }
    }
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

  handleDataTypeChange(dataType: DataType = this.dataType as DataType) {
    console.log('handleDataTypeChange', dataType);

    let typedValue: DataTypedValue;

    //const propertyConfig = { ...this.propertyConfig };
    switch (dataType) {
      case DataType.BOOLEAN:
        typedValue = { dataType, defaultValue: false };
        break;
      case DataType.IMAGE:
        typedValue = { dataType, defaultValue: { src: '', alt: '' } };
        break;
      case DataType.INT:
        typedValue = { dataType, defaultValue: 0 };
        break;
      case DataType.SHORT_TEXT:
      case DataType.LONG_TEXT:
        typedValue = { dataType, defaultValue: '' };
        break;
    }

    const propertyConfig: EntityPropertyConfig = produce(
      this.propertyConfig,
      draft => ({
        ...draft,
        ...typedValue,
      }),
    );

    console.log('new propertyConfig', JSON.stringify(propertyConfig));
    this.propertyConfig = propertyConfig;
  }

  updateField(field: PropertyConfigFormProp, rawValue: PropertyDataValue) {
    console.log('updateField', field, rawValue);
    let value = rawValue;
    if (propertyConfigFormProps[field].control.type === ControlType.NUMBER) {
      value = Number(value) || 0;
    }

    const propertyConfig = produce(this.propertyConfig, draft => ({
      ...draft,
      [field]: value,
    }));

    this.propertyConfig = propertyConfig;

    console.log('updated propertyConfig', JSON.stringify(this.propertyConfig));
  }

  @state()
  get updatedPropertyConfig(): EntityPropertyConfig {
    const commonEntityPropertyConfig: EntityPropertyConfig = {
      id: this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
      entityConfigId: this[PropertyConfigFormProp.ENTITY_CONFIG_ID],
      hidden: this[PropertyConfigFormProp.HIDDEN],
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
      dataType: DataType.BOOLEAN,
      defaultValue: false,
      userId: '' as EntityPropertyConfig['userId'],
    };

    switch (this[PropertyConfigFormProp.DATA_TYPE]) {
      case DataType.IMAGE:
        return {
          ...commonEntityPropertyConfig,
          dataType: DataType.IMAGE,
          defaultValue: this[
            PropertyConfigFormProp.DEFAULT_VALUE
          ] as ImageDataValue,
        };
      case DataType.INT:
        return {
          ...commonEntityPropertyConfig,
          dataType: DataType.INT,
          defaultValue:
            Number(this[PropertyConfigFormProp.DEFAULT_VALUE]) ||
            (0 as IntDataValue),
        };
      case DataType.BOOLEAN:
        return {
          ...commonEntityPropertyConfig,
          dataType: DataType.BOOLEAN,
          defaultValue: Boolean(
            this[PropertyConfigFormProp.DEFAULT_VALUE],
          ) as BooleanDataValue,
        };
      case DataType.SHORT_TEXT:
        return {
          ...commonEntityPropertyConfig,
          dataType: DataType.SHORT_TEXT,
          defaultValue: this[
            PropertyConfigFormProp.DEFAULT_VALUE
          ] as ShortTextDataValue,
        };
      case DataType.LONG_TEXT:
        return {
          ...commonEntityPropertyConfig,
          dataType: DataType.LONG_TEXT,
          defaultValue: this[
            PropertyConfigFormProp.DEFAULT_VALUE
          ] as LongTextDataValue,
        };
    }

    return commonEntityPropertyConfig;
  }

  async save() {
    if (this[PropertyConfigFormProp.PROPERTY_CONFIG_ID]) {
      console.log('updating property config', this.propertyConfig);
      const propertyConfig = await storage.updatePropertyConfig(
        this.propertyConfig,
      );

      if (propertyConfig) {
        addToast(translate('propertyConfig.updatedSuccessfully'));
        this.dispatchEvent(new PropertyConfigUpdatedEvent(propertyConfig));
      }
      return;
    }

    console.log('adding property config', this.propertyConfig);
    const propertyConfig = await storage.addPropertyConfig(this.propertyConfig);
    if (propertyConfig) {
      addToast(translate('propertyConfig.addedSuccessfully'));
      this.dispatchEvent(new PropertyConfigAddedEvent(propertyConfig));
    }
  }

  async delete() {
    this.confirmationModalIsOpen = false;

    const deleteResult = await storage.deletePropertyConfig(
      this[PropertyConfigFormProp.ENTITY_CONFIG_ID],
      this[PropertyConfigFormProp.PROPERTY_CONFIG_ID],
    );

    if (deleteResult) {
      addToast(translate('propertyConfig.deletedSuccessfully'));
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

    const updatedJson = JSON.stringify(this.updatedPropertyConfig);
    const currentJson = JSON.stringify(this.propertyConfig);

    return updatedJson === currentJson;
  }

  renderDefaultValueField() {
    switch (this.propertyConfig[PropertyConfigFormProp.DATA_TYPE]) {
      case DataType.BOOLEAN:
        return html` <ss-toggle
          ?on=${this.propertyConfig[PropertyConfigFormProp.DEFAULT_VALUE]}
          @toggle-changed=${(e: ToggleChangedEvent) => {
            this.updateField(PropertyConfigFormProp.DEFAULT_VALUE, e.detail.on);
          }}
        ></ss-toggle>`;

      case DataType.IMAGE:
        return html` <image-field
          src=${this.propertyConfig[PropertyConfigFormProp.DEFAULT_VALUE].src}
          alt=${this.propertyConfig[PropertyConfigFormProp.DEFAULT_VALUE].alt}
          @property-changed=${(e: PropertyChangedEvent) => {
            this.updateField(
              PropertyConfigFormProp.DEFAULT_VALUE,
              e.detail.value,
            );
          }}
        ></image-field>`;

      case DataType.INT:
        return html`
          <ss-input
            type="number"
            value=${this.propertyConfig[PropertyConfigFormProp.DEFAULT_VALUE]}
            @input-changed=${(e: InputChangedEvent) => {
              this.updateField(
                PropertyConfigFormProp.DEFAULT_VALUE,
                parseInt(e.detail.value),
              );
            }}
          ></ss-input>
        `;

      default:
        return html`
          <ss-input
            type="text"
            value=${this.propertyConfig[PropertyConfigFormProp.DEFAULT_VALUE]}
            @input-changed=${(e: InputChangedEvent) => {
              this.updateField(
                PropertyConfigFormProp.DEFAULT_VALUE,
                e.detail.value,
              );
            }}
          ></ss-input>
        `;
    }
  }

  renderField(field: PropertyConfigFormProp) {
    if (field === PropertyConfigFormProp.DEFAULT_VALUE) {
      return this.renderDefaultValueField();
    }

    switch (propertyConfigFormProps[field].control.type) {
      case ControlType.SELECT:
        return html`
          <ss-select
            .options=${(
              propertyConfigFormProps[field].control as SelectControl
            ).options.map(option => ({
              label: translate(option),
              value: option,
            }))}
            selected=${this[field]}
            @select-changed=${(e: InputChangedEvent) => {
              if (field === PropertyConfigFormProp.DATA_TYPE) {
                this.handleDataTypeChange(e.detail.value as DataType);
              } else {
                this.updateField(field, e.detail.value);
              }
            }}
          ></ss-select>
        `;
      case ControlType.BOOLEAN:
        return html`
          <ss-toggle
            ?on=${this[field]}
            @toggle-changed=${(e: ToggleChangedEvent) => {
              this.updateField(field, e.detail.on);
            }}
          ></ss-toggle>
        `;
      case ControlType.NUMBER:
      case ControlType.TEXT:
        return html`
          <ss-input
            type=${propertyConfigFormProps[field].control.type}
            value=${this[field]}
            @input-changed=${(e: InputChangedEvent) => {
              this.updateField(field, e.detail.value);
            }}
          ></ss-input>
        `;
    }
  }

  render() {
    return html`
      <ss-collapsable
        title=${this.propertyConfig.name || translate('propertyConfiguration')}
        panelId=${`propertyConfigForm-${this.propertyConfig.id}`}
        .open=${this.open}
      >
        <fieldset class="entity-config-form">
          <legend>${translate('propertyConfiguration')}</legend>

          ${repeat(
            this.visibleFields,
            field => field,
            field =>
              html` <div class="field">
                <label for=${field}
                  >${translate(`propertyConfig.field.${field}`)}</label
                >
                ${this.renderField(field)}
              </div>`,
          )}
        </fieldset>
        <div class="buttons">
          <ss-button
            positive
            ?disabled=${this.inSync}
            @click=${() => {
              this.save();
            }}
          >
            ${translate('save')}
          </ss-button>
          <ss-button
            negative
            ?disabled=${!this[PropertyConfigFormProp.PROPERTY_CONFIG_ID]}
            @click=${() => {
              this.confirmationModalIsOpen = true;
            }}
          >
            ${translate('delete')}
          </ss-button>
        </div>
      </ss-collapsable>

      <confirmation-modal
        ?open=${this.confirmationModalIsOpen}
        @confirmation-accepted=${this.delete}
        @confirmation-declined=${() => {
          this.confirmationModalIsOpen = false;
        }}
      ></confirmation-modal>
    `;
  }
}
