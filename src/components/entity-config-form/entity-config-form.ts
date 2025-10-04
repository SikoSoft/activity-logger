import { html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { produce } from 'immer';

import {
  defaultEntityConfig,
  defaultEntityPropertyConfig,
  EntityConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import {
  EntityConfigFormProp,
  entityConfigFormProps,
  EntityConfigFormProps,
  PropertyConfigInstance,
  PropertyConfigProblemMap,
} from './entity-config-form.models';
import { storage } from '@/lib/Storage';

import {
  PropertyConfigAddedEvent,
  PropertyConfigBreakingChangeDetectedEvent,
  PropertyConfigBreakingChangesResolvedEvent,
  PropertyConfigUpdatedEvent,
} from '@/components/property-config-form/property-config-form.events';
import { InputChangedEvent } from '@ss/ui/components/ss-input.events';
import { CollapsableToggledEvent } from '@ss/ui/components/ss-collapsable.events';

import '@/components/property-config-form/property-config-form';
import '@ss/ui/components/ss-collapsable';
import '@ss/ui/components/confirmation-modal';
import '@ss/ui/components/sortable-list';
import '@ss/ui/components/sortable-item';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '@/state';
import { SortUpdatedEvent } from '@ss/ui/components/sortable-list.events';
import { translate } from '@/lib/Localization';
import { EntityConfigDeletedEvent } from './entity-config-form.events';

@customElement('entity-config-form')
export class EntityConfigForm extends MobxLitElement {
  public state = appState;

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    .field {
      margin-bottom: 1rem;
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }

    .revision-info {
      border: 1px solid #ffa500;
      background-color: #ffe4b1;
      color: #000;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
    }

    .warning {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  `;

  @state()
  entityConfig: EntityConfig = defaultEntityConfig;

  @state()
  confirmationModalIsOpen: boolean = false;

  @state()
  isSaving = false;

  @state()
  propertyConfigInstances: PropertyConfigInstance[] = [];

  @state()
  propertyConfigProblems: PropertyConfigProblemMap = [];

  @state()
  saveNewRevision: boolean = false;

  @property({ type: Boolean, reflect: true })
  open: boolean = false;

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

  @state()
  get hasBreakingChanges(): boolean {
    return this.propertyConfigProblems.some(problems => problems !== undefined);
  }

  @state()
  get inSync(): boolean {
    return (
      this.entityConfig.name === this[EntityConfigFormProp.NAME] &&
      this.entityConfig.description ===
        this[EntityConfigFormProp.DESCRIPTION] &&
      JSON.stringify(this.entityConfig.properties) ===
        JSON.stringify(this[EntityConfigFormProp.PROPERTIES])
    );
  }

  @query('.revision-target')
  revisionInfo!: HTMLElement;

  get isSaveEnabled(): boolean {
    return !this.isSaving && (!this.inSync || this.saveNewRevision);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.entityConfig = {
      userId: '',
      id: this[EntityConfigFormProp.ENTITY_CONFIG_ID],
      name: this[EntityConfigFormProp.NAME],
      description: this[EntityConfigFormProp.DESCRIPTION],
      properties: this[EntityConfigFormProp.PROPERTIES],
      revisionOf: null,
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
      errors.push(translate('entityConfigNameRequired'));
    }
    return errors;
  }

  async save() {
    const validationErrors = this.validate();
    if (validationErrors.length > 0) {
      addToast(
        translate('entityConfigValidationFailed'),
        NotificationType.ERROR,
      );
      return;
    }

    this.isSaving = true;
    let result: unknown;

    const entityConfig = produce(this.entityConfig, draft => {
      if (this.saveNewRevision) {
        draft.id = 0;
        draft.revisionOf = this.entityConfig.id;
        draft.properties = draft.properties.map(p => ({ ...p, id: 0 }));
      }
    });

    if (entityConfig.id) {
      result = await storage.updateEntityConfig(entityConfig);
    } else {
      result = await storage.addEntityConfig(entityConfig);
    }

    this.isSaving = false;

    if (!result) {
      addToast(translate('failedToSaveEntityConfig'), NotificationType.ERROR);
      return;
    }

    addToast(translate('entityConfigSaved'), NotificationType.SUCCESS);
  }

  async delete() {
    const result = await storage.deleteEntityConfig(this.entityConfig.id);

    if (!result) {
      addToast(translate('failedToDeleteEntityConfig'), NotificationType.ERROR);
      return;
    }

    addToast(translate('entityConfigDeleted'), NotificationType.SUCCESS);

    this.dispatchEvent(
      new EntityConfigDeletedEvent({ id: this.entityConfig.id }),
    );
  }

  addPropertyToTop() {
    const entityPropertyConfig = produce(
      defaultEntityPropertyConfig,
      draft => draft,
    );

    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.unshift(entityPropertyConfig);
    });
    this.entityConfig = entityConfig;
  }

  addPropertyToBottom() {
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.push(defaultEntityPropertyConfig);
    });
    this.entityConfig = entityConfig;
  }

  updateProperty(index: number, updatedProperty: EntityPropertyConfig) {
    console.log('updateProperty', index, updatedProperty);
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties[index] = updatedProperty;
    });
    this.entityConfig = entityConfig;
  }

  deleteProperty(index: number) {
    const entityConfig = produce(this.entityConfig, draft => {
      draft.properties.splice(index, 1);
    });
    this.entityConfig = entityConfig;
  }

  toggle(e: CollapsableToggledEvent) {
    //this.open = e.detail.isOpen;
  }

  isPanelOpen(id: number): boolean {
    if (!id) {
      return true;
    }

    return (
      this.state.collapsablePanelState[`propertyConfigForm-${id}`] || false
    );
  }

  sortUpdated(e: SortUpdatedEvent) {
    const newOrder = e.detail;
    console.log('sortUpdated', newOrder);

    storage.setEntityPropertyOrder(
      this.entityConfig.id,
      newOrder.sortedIds.map((id, index) => ({ id: Number(id), order: index })),
    );
  }

  breakingChangeDetected(
    index: number,
    e: PropertyConfigBreakingChangeDetectedEvent,
  ) {
    const { propertyConfig, problems } = e.detail;
    console.log('breakingChangeDetected', propertyConfig, problems, index);
    this.propertyConfigProblems = produce(
      this.propertyConfigProblems,
      draft => {
        draft[index] = problems;
      },
    );

    if (this.revisionInfo) {
      console.log('scrolling to revision info');
      this.revisionInfo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  breakingChangesResolved(
    index: number,
    e: PropertyConfigBreakingChangesResolvedEvent,
  ) {
    const { propertyConfig } = e.detail;
    console.log('breakingChangesResolved', propertyConfig, index);
    this.propertyConfigProblems = produce(
      this.propertyConfigProblems,
      draft => {
        draft[index] = undefined;
      },
    );
  }

  render() {
    return html`
      <ss-collapsable
        title=${this.entityConfig.name || translate('entityConfiguration')}
        ?open=${this.open}
        panelId=${`entityConfigForm-${this.entityConfig.id}`}
        @collapsable-toggled=${this.toggle}
      >
        <div class="entity-config-form">
          <div class="field">
            <label for="entity-name">${translate('entityName')}</label>

            <ss-input
              id="entity-name"
              .value=${this.entityConfig.name}
              @input-changed=${(e: InputChangedEvent) =>
                this.updateName(e.detail.value)}
            ></ss-input>
          </div>

          <div class="field">
            <label for="entity-description"
              >${translate('entityDescription')}</label
            >

            <ss-input
              id="entity-description"
              .value=${this.entityConfig.description}
              @input-changed=${(e: InputChangedEvent) =>
                this.updateDescription(e.detail.value)}
            ></ss-input>
          </div>

          <div class="revision-target"></div>

          ${this.hasBreakingChanges
            ? html` <div class="revision-info">
                <div class="warning">${translate('breakingChangeWarning')}</div>

                <input
                  type="checkbox"
                  id="new-revision"
                  ?checked=${this.saveNewRevision}
                  @click=${() => {
                    this.saveNewRevision = !this.saveNewRevision;
                  }}
                />

                <label for="new-revision"
                  >${translate('createNewRevision')}</label
                >
              </div>`
            : nothing}

          <div class="buttons">
            <ss-button
              positive
              ?disabled=${!this.isSaveEnabled}
              @click=${this.save}
              >${translate(
                this.saveNewRevision
                  ? 'createNewRevision'
                  : this.entityConfig.id
                    ? 'update'
                    : 'create',
              )}</ss-button
            >

            <ss-button
              negative
              @click=${() => {
                this.confirmationModalIsOpen = true;
              }}
              >${translate('delete')}</ss-button
            >
          </div>

          ${this.entityConfig.id
            ? html`
                <div class="properties">
                  <ss-button @click=${this.addPropertyToTop}
                    >${translate('addProperty')}</ss-button
                  >

                  <sortable-list @sort-updated=${this.sortUpdated}>
                    ${repeat(
                      this.entityConfig.properties,
                      property => property.id,
                      (property, index) => html`
                        <sortable-item id=${property.id}>
                          <property-config-form
                            ?open=${this.isPanelOpen(property.id)}
                            entityConfigId=${this.entityConfig.id}
                            propertConfigId=${property.id}
                            dataType=${property.dataType}
                            propertyConfigId=${property.id}
                            name=${property.name}
                            required=${property.required}
                            repeat=${property.repeat}
                            allowed=${property.allowed}
                            prefix=${property.prefix}
                            suffix=${property.suffix}
                            ?hidden=${property.hidden}
                            .defaultValue=${property.defaultValue}
                            @property-config-updated=${(
                              e: PropertyConfigUpdatedEvent,
                            ) => this.updateProperty(index, e.detail)}
                            @property-config-added=${(
                              e: PropertyConfigAddedEvent,
                            ) => this.updateProperty(index, e.detail)}
                            @property-config-deleted=${() => {
                              this.deleteProperty(index);
                            }}
                            @property-config-breaking-change-detected=${(
                              e: PropertyConfigBreakingChangeDetectedEvent,
                            ) => {
                              this.breakingChangeDetected(index, e);
                            }}
                            @property-config-breaking-changes-resolved=${(
                              e: PropertyConfigBreakingChangesResolvedEvent,
                            ) => {
                              this.breakingChangesResolved(index, e);
                            }}
                          ></property-config-form>
                        </sortable-item>
                      `,
                    )}
                  </sortable-list>

                  ${this.entityConfig.properties.length > 0
                    ? html` <ss-button @click=${this.addPropertyToBottom}
                        >${translate('addProperty')}</ss-button
                      >`
                    : nothing}
                </div>
              `
            : nothing}
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
