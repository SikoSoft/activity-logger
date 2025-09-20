import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import {
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

@customElement('property-field')
export class PropertyField extends MobxLitElement {
  private state = appState;

  protected renderField = html``;

  @property({ type: Number })
  [PropertyFieldProp.INSTANCE_ID]: PropertyFieldProps[PropertyFieldProp.INSTANCE_ID] =
    propertyFieldProps[PropertyFieldProp.INSTANCE_ID].default;

  @property({ type: Object })
  propertyConfig: EntityPropertyConfig = defaultEntityPropertyConfig;

  @property({ type: String })
  [PropertyFieldProp.VALUE]: PropertyFieldProps[PropertyFieldProp.VALUE] =
    propertyFieldProps[PropertyFieldProp.VALUE].default;

  connectedCallback(): void {
    super.connectedCallback();
    this.state.setEntityPropertyInstance(
      this.propertyConfig.id,
      this.state.entityPropertyInstances[this.propertyConfig.id] || 1,
    );

    console.log('Property field connected:', this.state.entityConfigs);
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
  get showDeleteButton(): boolean {
    return true;
  }

  @state()
  get showCloneButton(): boolean {
    console.log('Show clone button:', this.propertyConfig);

    if (
      this.state.entityPropertyInstances[this.propertyConfig.id] <
      this.propertyConfig.allowed
    ) {
      return true;
    }

    return false;
  }

  render() {
    return html`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        ${this.renderField}

        <div class="buttons">
          ${this.showDeleteButton
            ? html` <ss-button
                @click=${() =>
                  this.dispatchEvent(
                    new PropertyDeletedEvent({
                      propertyConfigId: this.propertyConfig.id,
                    }),
                  )}
                >Delete</ss-button
              >`
            : nothing}
          ${this.showCloneButton
            ? html` <ss-button
                @click=${() =>
                  this.dispatchEvent(
                    new PropertyClonedEvent({
                      propertyConfigId: this.propertyConfig.id,
                    }),
                  )}
                >Clone</ss-button
              >`
            : nothing}
        </div>
      </div>
    `;
  }
}
