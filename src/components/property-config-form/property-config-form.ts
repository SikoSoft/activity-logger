import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  defaultEntityConfig,
  defaultEntityPropertyConfig,
  EntityConfig,
  EntityPropertyConfig,
} from '@/models/Entity';
import { msg } from '@lit/localize';
import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { storage } from '@/lib/Storage';
import {
  PropertyConfigFormProp,
  propertyConfigFormProps,
  PropertyConfigFormProps,
} from './property-config-form.models';
import { produce } from 'immer';
import { PropertyConfigUpdatedEvent } from './property-config-form.events';

@customElement('property-config-form')
export class PropertyConfigForm extends LitElement {
  @state()
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  static styles = css``;

  @property({ type: String })
  [PropertyConfigFormProp.ID]: PropertyConfigFormProps[PropertyConfigFormProp.ID] =
    propertyConfigFormProps[PropertyConfigFormProp.ID].default;

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

  validate() {
    const errors: string[] = [];

    return errors;
  }

  updateField(field: PropertyConfigFormProp, value: string | number | boolean) {
    const propertyConfig = produce(this.propertyConfig, draft => ({
      ...draft,
      [field]: value,
    }));
    this.dispatchEvent(new PropertyConfigUpdatedEvent(propertyConfig));
    // this[field] = value;
  }

  render() {
    return html`
      <div class="entity-config-form">


      ${Object.values(PropertyConfigFormProp).map(
        field => html`
          <div class="field">
            <label for=${field}>${msg(field)}</label>
            <ss-input
              id=${field}
              .value=${this[field]}
              @input-changed=${(e: InputChangedEvent) => {
                this.updateField(field, e.detail.value);
              }}
            ></ss-input>
          </div>
        `,
      )}

        </div>
      </div>
    `;
  }
}
