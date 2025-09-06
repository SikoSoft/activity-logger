import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { msg } from '@lit/localize';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import {
  PropertyConfigFormProp,
  propertyConfigFormProps,
  PropertyConfigFormProps,
} from './property-config-form.models';
import { produce } from 'immer';
import { PropertyConfigUpdatedEvent } from './property-config-form.events';
import { ControlType, SelectControl } from '@/models/Control';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

@customElement('property-config-form')
export class PropertyConfigForm extends LitElement {
  @state()
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  static styles = css``;

  @property({ type: String })
  [PropertyConfigFormProp.DATA_TYPE]: PropertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE] =
    propertyConfigFormProps[PropertyConfigFormProp.DATA_TYPE].default;

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
    this.dispatchEvent(new PropertyConfigUpdatedEvent(propertyConfig));
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
                    .value=${this[field]}
                    @input-changed=${(e: InputChangedEvent) => {
                      this.updateField(field, e.detail.value);
                    }}
                  ></ss-input>
                `}
          </div>`,
      )}
        </div>
      </fieldset>`;
  }
}
