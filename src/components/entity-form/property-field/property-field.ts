import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  DataType,
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import {
  PropertyFieldProp,
  PropertyFieldProps,
  propertyFieldProps,
} from './property-field.models';
import {
  PropertyChangedEvent,
  PropertyClonedEvent,
  PropertyDeletedEvent,
} from '@/components/entity-form/property-field/property-field.events';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';

import '@/components/entity-form/int-field/int-field';
import '@/components/entity-form/text-field/text-field';
import '@/components/entity-form/image-field/image-field';

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

  delete() {
    if (!this.canDelete) {
      console.log('cannot delete, limit reached');
      return;
    }

    this.dispatchEvent(
      new PropertyDeletedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
  }

  clone() {
    if (!this.canClone) {
      console.log('cannot clone, limit reached');
      return;
    }

    this.dispatchEvent(
      new PropertyClonedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
  }

  setConfirmationModalIsOpen(isOpen: boolean) {
    console.log('Confirmation modal state changed:', this.uiId, isOpen);
    this.confirmationModalIsOpen = isOpen;
  }

  renderField() {
    switch (this.propertyConfig.dataType) {
      case DataType.IMAGE:
        return html`<image-field
          src=${this.propertyConfig.defaultValue.src}
          alt=${this.propertyConfig.defaultValue.alt}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></image-field>`;

      case DataType.SHORT_TEXT:
        return html`<text-field
          value=${this.propertyConfig.defaultValue}
          uiId=${this.uiId}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></text-field>`;

      case DataType.LONG_TEXT:
        return html`<text-field
          value=${this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></text-field>`;

      case DataType.INT:
        return html`<int-field
          value=${this.propertyConfig.defaultValue}
          entityConfigId=${this.propertyConfig.entityConfigId}
          propertyConfigId=${this.propertyConfig.id}
        ></int-field>`;
    }

    return nothing;
  }

  render() {
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
                @click=${() => {
                  console.log(
                    'Delete button clicked',
                    this.confirmationModalIsOpen,
                  );
                  this.setConfirmationModalIsOpen(true);
                }}
                >Delete</ss-button
              >`
            : nothing}
          ${this.canClone
            ? html` <ss-button positive @click=${this.clone}>Clone</ss-button>`
            : nothing}
        </div>

        <confirmation-modal
          ?open=${this.confirmationModalIsOpen}
          @confirmation-accepted=${this.delete}
          @confirmation-declined=${() => {
            this.setConfirmationModalIsOpen(false);
          }}
        ></confirmation-modal>
      </div>
    `;
  }
}
