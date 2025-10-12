import { html, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  DataType,
  DateDataValue,
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
  ImageDataValue,
  IntDataValue,
  PropertyDataValue,
} from 'api-spec/models/Entity';
import {
  PropertyFieldProp,
  PropertyFieldProps,
  propertyFieldProps,
} from './property-field.models';
import {
  PropertyClonedEvent,
  PropertyDeletedEvent,
} from '@/components/entity-form/property-field/property-field.events';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

import '@/components/entity-form/date-field/date-field';
import '@/components/entity-form/int-field/int-field';
import '@/components/entity-form/long-text-field/long-text-field';
import '@/components/entity-form/short-text-field/short-text-field';
import '@/components/entity-form/image-field/image-field';
import { translate } from '@/lib/Localization';

@customElement('property-field')
export class PropertyField extends MobxLitElement {
  private state = appState;

  @property({ type: Number })
  [PropertyFieldProp.INSTANCE_ID]: PropertyFieldProps[PropertyFieldProp.INSTANCE_ID] =
    propertyFieldProps[PropertyFieldProp.INSTANCE_ID].default;

  @property({ type: Number })
  [PropertyFieldProp.ENTITY_CONFIG_ID]: PropertyFieldProps[PropertyFieldProp.ENTITY_CONFIG_ID] =
    propertyFieldProps[PropertyFieldProp.ENTITY_CONFIG_ID].default;

  @property({ type: Number })
  [PropertyFieldProp.PROPERTY_CONFIG_ID]: PropertyFieldProps[PropertyFieldProp.PROPERTY_CONFIG_ID] =
    propertyFieldProps[PropertyFieldProp.PROPERTY_CONFIG_ID].default;

  @property({ type: String })
  [PropertyFieldProp.UI_ID]: PropertyFieldProps[PropertyFieldProp.UI_ID] =
    propertyFieldProps[PropertyFieldProp.UI_ID].default;

  @property({ type: String })
  [PropertyFieldProp.VALUE]: PropertyFieldProps[PropertyFieldProp.VALUE] =
    propertyFieldProps[PropertyFieldProp.VALUE].default;

  @state()
  confirmationModalIsOpen = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.state.setEntityPropertyInstance(
      this.propertyConfig.id,
      (this.state.entityPropertyInstances[this.propertyConfig.id] || 0) + 1,
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.state.setEntityPropertyInstance(
      this.propertyConfig.id,
      Math.max(
        0,
        (this.state.entityPropertyInstances[this.propertyConfig.id] || 1) - 1,
      ),
    );
  }

  @state()
  get propertyConfig(): EntityPropertyConfig {
    let propertyConfig = defaultEntityPropertyConfig;

    const entityConfig = this.state.entityConfigs.find(
      config => config.id === this[PropertyFieldProp.ENTITY_CONFIG_ID],
    );

    if (entityConfig) {
      propertyConfig =
        entityConfig.properties.find(
          prop => prop.id === this[PropertyFieldProp.PROPERTY_CONFIG_ID],
        ) || defaultEntityPropertyConfig;
    }

    return propertyConfig;
  }

  @state()
  get usedInstancesOfThisProperty(): number {
    return this.state.entityPropertyInstances[this.propertyConfig.id] || 0;
  }

  @state()
  get canDelete(): boolean {
    if (this.usedInstancesOfThisProperty < this.propertyConfig.required + 1) {
      return false;
    }
    return true;
  }

  @state()
  get canClone(): boolean {
    if (this.usedInstancesOfThisProperty < this.propertyConfig.allowed) {
      return true;
    }

    return false;
  }

  delete(): void {
    if (!this.canDelete) {
      return;
    }

    this.dispatchEvent(
      new PropertyDeletedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
  }

  clone(): void {
    if (!this.canClone) {
      return;
    }

    this.dispatchEvent(
      new PropertyClonedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
  }

  setConfirmationModalIsOpen(isOpen: boolean): void {
    this.confirmationModalIsOpen = isOpen;
  }

  renderField(): TemplateResult | typeof nothing {
    let value: PropertyDataValue;
    switch (this.propertyConfig.dataType) {
      case DataType.DATE:
        value = this.value as DateDataValue;
        return html`<date-field
          uiId=${this.uiId}
          .value=${value || this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></date-field>`;

      case DataType.IMAGE:
        value = this.value as ImageDataValue;
        return html`<image-field
          uiId=${this.uiId}
          src=${value.src || this.propertyConfig.defaultValue.src}
          alt=${value.alt || this.propertyConfig.defaultValue.alt}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></image-field>`;

      case DataType.SHORT_TEXT:
        return html`<short-text-field
          uiId=${this.uiId}
          value=${this.value || this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></short-text-field>`;

      case DataType.LONG_TEXT:
        return html`<long-text-field
          uiId=${this.uiId}
          value=${this.value || this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></long-text-field>`;

      case DataType.INT:
        value = this.value as IntDataValue;
        return html`<int-field
          uiId=${this.uiId}
          value=${this.value || this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></int-field>`;
    }

    return nothing;
  }

  render(): TemplateResult | typeof nothing {
    return html`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        ${this.renderField()}

        <div
          class="buttons"
          data-used-instances=${this.usedInstancesOfThisProperty}
        >
          ${this.canDelete
            ? html` <ss-button
                negative
                @click=${(): void => {
                  this.setConfirmationModalIsOpen(true);
                }}
                >${translate('delete')}</ss-button
              >`
            : nothing}
          ${this.canClone
            ? html` <ss-button positive @click=${this.clone}
                >${translate('clone')}</ss-button
              >`
            : nothing}
        </div>

        <confirmation-modal
          ?open=${this.confirmationModalIsOpen}
          @confirmation-accepted=${this.delete}
          @confirmation-declined=${(): void => {
            this.setConfirmationModalIsOpen(false);
          }}
        ></confirmation-modal>
      </div>
    `;
  }
}
