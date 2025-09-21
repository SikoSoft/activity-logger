import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
  DataType,
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { PropertyChangedEvent } from '../entity-form.events';
import {
  PropertyFieldProp,
  PropertyFieldProps,
  propertyFieldProps,
} from './property-field.models';
import {
  PropertyClonedEvent,
  PropertyDeletedEvent,
} from './property-field.events';
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
      this.state.entityPropertyInstances[this.propertyConfig.id] || 1,
    );
  }

  protected handleInputChanged(e: InputChangedEvent) {
    const value = e.detail.value;

    this.dispatchEvent(
      new PropertyChangedEvent({
        propertyId: this.propertyConfig.id,
        instanceId: this[PropertyFieldProp.INSTANCE_ID],
        dataType: this.propertyConfig.dataType,
        value,
      }),
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
  get showDeleteButton(): boolean {
    return true;
  }

  @state()
  get showCloneButton(): boolean {
    if (
      this.state.entityPropertyInstances[this.propertyConfig.id] <
      this.propertyConfig.allowed
    ) {
      return true;
    }

    return false;
  }

  delete() {
    this.dispatchEvent(
      new PropertyDeletedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
  }

  clone() {
    this.dispatchEvent(
      new PropertyClonedEvent({
        uiId: this[PropertyFieldProp.UI_ID],
      }),
    );
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

        <div class="buttons">
          ${this.showDeleteButton
            ? html` <ss-button
                negative
                @click=${() => {
                  this.confirmationModalIsOpen = true;
                }}
                >Delete</ss-button
              >`
            : nothing}
          ${this.showCloneButton
            ? html` <ss-button positive @click=${this.clone}>Clone</ss-button>`
            : nothing}
        </div>

        <confirmation-modal
          ?open=${this.confirmationModalIsOpen}
          @confirmation-accepted=${this.delete}
          @confirmation-declined=${() => {
            this.confirmationModalIsOpen = false;
          }}
        ></confirmation-modal>
      </div>
    `;
  }
}
