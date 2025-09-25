import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { v4 as uuidv4 } from 'uuid';

import { ListFilterType } from 'api-spec/models/List';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import {
  DataType,
  EntityConfig,
  EntityItem,
  EntityProperty,
  PropertyDataValue,
} from 'api-spec/models/Entity';
import { appState } from '@/state';
import { api } from '@/lib/Api';
import { ViewElement } from '@/lib/ViewElement';
import {
  EntityFormProp,
  entityFormProps,
  EntityFormProps,
  PropertyInstance,
  RequestBody,
  SuggestionInputType,
  SuggestionLastInput,
  ValidateionResult,
} from './entity-form.models';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@ss/ui/components/tag-manager';
import '@ss/ui/components/confirmation-modal';
import '@/components/entity-form/property-field/property-field';

import {
  EntityItemCanceledEvent,
  EntityItemDeletedEvent,
  EntityItemUpdatedEvent,
} from './entity-form.events';
import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';
import { TagSuggestionsRequestedEvent } from '@ss/ui/components/tag-input.events';
import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';

import { theme } from '@/styles/theme';
import {
  PropertyChangedEvent,
  PropertyClonedEvent,
  PropertyDeletedEvent,
} from './property-field/property-field.events';
import { translate } from '@/lib/Localization';

@customElement('entity-form')
export class EntityForm extends ViewElement {
  private state = appState;
  private minLengthForSuggestion = 1;
  private suggestionTimeout: ReturnType<typeof setTimeout> | null = null;
  private abortController: AbortController | null = null;

  static styles = [
    theme,
    css`
      form {
        padding: 1rem;
      }

      tag-manager,
      .time,
      .type {
        display: none;
      }

      form.advanced-mode tag-manager,
      form.advanced-mode .time,
      form.advanced-mode .type {
        display: initial;
      }

      div:last-child {
        margin-top: 1rem;
      }
    `,
  ];

  @property({ type: Number })
  [EntityFormProp.ENTITY_ID]: EntityFormProps[EntityFormProp.ENTITY_ID] =
    entityFormProps[EntityFormProp.ENTITY_ID].default;

  @property({ type: Number })
  [EntityFormProp.TYPE]: EntityFormProps[EntityFormProp.TYPE] =
    entityFormProps[EntityFormProp.TYPE].default;

  @property({ type: Array })
  [EntityFormProp.TAGS]: EntityFormProps[EntityFormProp.TAGS] =
    entityFormProps[EntityFormProp.TAGS].default;

  @property()
  [EntityFormProp.TAG_VALUE]: EntityFormProps[EntityFormProp.TAG_VALUE] =
    entityFormProps[EntityFormProp.TAG_VALUE].default;

  @property({ type: Array })
  [EntityFormProp.PROPERTIES]: EntityFormProps[EntityFormProp.PROPERTIES] =
    entityFormProps[EntityFormProp.PROPERTIES].default;

  @state() initialTags: string = '';
  @state() confirmModalShown: boolean = false;
  @state() advancedMode: boolean = false;
  @state() loading: boolean = false;
  @state() lastInput: SuggestionLastInput = {
    [SuggestionInputType.ACTION]: { value: '', hadResults: true },
    [SuggestionInputType.TAG]: { value: '', hadResults: true },
  };
  @state() tagSuggestions: string[] = [];

  @state() propertyInstances: PropertyInstance[] = [];

  @state() propertiesSetup = false;

  @state()
  get classes() {
    return { box: true, 'advanced-mode': this.state.advancedMode };
  }

  @state()
  get tagsAndSuggestions(): string[] {
    return Array.from(new Set([...this.tags, ...this.state.tagSuggestions]));
  }

  @state()
  get tagSuggestionsEnabled(): boolean {
    return (
      this.state.listConfig.setting[SettingName.TAG_SUGGESTIONS] !==
      TagSuggestions.DISABLED
    );
  }

  @state()
  get entityConfig(): EntityConfig | undefined {
    return this.state.entityConfigs.find(entity => entity.id === this.type);
  }

  @state()
  get canAddProperty(): boolean {
    if (!this.entityConfig) {
      return false;
    }

    return this.entityConfig.properties.some(propertyConfig =>
      this.propertyAtMax(propertyConfig.id),
    );
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.initialTags = JSON.stringify(this.tags);

    console.log('properties on connect:', JSON.stringify(this.properties));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
      this.suggestionTimeout = null;
    }

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    this.setupProperties();
  }

  get apiUrl(): string {
    return this.entityId ? `entity/${this.entityId}` : `entity`;
  }

  @state()
  get hasChanged(): boolean {
    return true;
  }

  setupProperties() {
    if (!this.entityConfig) {
      return;
    }

    if (this.entityConfig && !this.propertiesSetup) {
      const existingProperties: PropertyInstance[] = this.properties.map(
        property => ({
          propertyConfig: this.entityConfig!.properties.find(
            config => config.id === property.propertyConfigId,
          )!,
          instanceId: property.id,
          uiId: uuidv4(),
          value: property.value,
        }),
      );

      const availableProperties: PropertyInstance[] =
        this.entityConfig.properties.map(propertyConfig => ({
          propertyConfig,
          instanceId: 0,
          uiId: uuidv4(),
          value: propertyConfig.defaultValue,
        }));

      this.propertyInstances = [...existingProperties, ...availableProperties];
      this.propertiesSetup = true;
    }
  }

  private propertyAtMax(propertyId: number): boolean {
    if (!this.entityConfig) {
      return true;
    }

    const propertyConfig = this.entityConfig.properties.find(
      prop => prop.id === propertyId,
    );
    return propertyConfig
      ? this.numberOfPropertiesWithType(propertyId) >= propertyConfig.repeat
      : true;
  }

  private numberOfPropertiesWithType(type: number): number {
    return this.propertyInstances.filter(
      prop =>
        prop.propertyConfig.id === type &&
        this.validateTypedData(prop.propertyConfig.dataType, prop.value),
    ).length;
  }

  private validateTypedData(
    dataType: DataType,
    value: PropertyDataValue,
  ): boolean {
    switch (dataType) {
      case DataType.SHORT_TEXT:
      case DataType.LONG_TEXT:
        return (
          typeof value === 'string' && value.length > 0 && value.length <= 255
        );
      case DataType.INT:
        return typeof value === 'number';
      case DataType.BOOLEAN:
        return typeof value === 'boolean';
      default:
        return false;
    }
  }

  private validateConstraints(): ValidateionResult {
    const errors: string[] = [];

    if (!this.entityConfig) {
      errors.push(translate('entityTypeRequired'));
      return { isValid: false, errors };
    }

    this.entityConfig.properties.forEach(propertyConfig => {
      const count = this.numberOfPropertiesWithType(propertyConfig.id);

      if (count < propertyConfig.required) {
        errors.push(
          translate('entityPropertyMinCount', {
            property: propertyConfig.name,
            count: propertyConfig.required,
          }),
        );
      }

      if (count > propertyConfig.allowed) {
        errors.push(
          translate('entityPropertyMaxCount', {
            property: propertyConfig.name,
            count: propertyConfig.allowed,
          }),
        );
      }
    });

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true };
  }

  private async saveAction() {
    this.loading = true;
    const validationResult = this.validateConstraints();

    if (!validationResult.isValid) {
      this.loading = false;

      validationResult.errors.forEach(error =>
        addToast(error, NotificationType.ERROR),
      );

      return;
    }

    try {
      if (validationResult.isValid && this.hasChanged) {
        const timeZone = new Date().getTimezoneOffset();

        const properties: EntityProperty[] = this.propertyInstances.map(
          propertyInstance => ({
            id: propertyInstance.instanceId,
            propertyConfigId: propertyInstance.propertyConfig.id,
            value: propertyInstance.value,
          }),
        );

        const payload: RequestBody = {
          entityConfigId: this.type,
          timeZone,
          tags: this.tagsAndSuggestions,
          properties,
        };

        const result = this.entityId
          ? await api.put<RequestBody, EntityItem>(this.apiUrl, payload)
          : await api.post<RequestBody, EntityItem>(this.apiUrl, payload);

        this.reset();
        this.loading = false;

        if (!result || !result.isOk) {
          addToast(translate('entityFailedToSave'), NotificationType.ERROR);
          return;
        }

        this.dispatchEvent(
          new EntityItemUpdatedEvent({
            id: this.entityId,
            tags: this.tags,
          }),
        );

        addToast(
          this.entityId ? translate('updated') : translate('added'),
          NotificationType.SUCCESS,
        );
        return;
      }

      this.dispatchEvent(
        new EntityItemCanceledEvent({
          id: this.entityId,
        }),
      );
    } catch (error) {
      console.error(`Error encountered in when saving action: ${error}`);
    }

    this.loading = false;
  }

  private reset(): void {
    this.tagValue = '';
    if (!this.entityId) {
      this.tags =
        this.state.listConfig.filter.tagging[ListFilterType.CONTAINS_ALL_OF];
    }
    this.state.setTagSuggestions([]);

    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
      this.suggestionTimeout = null;
    }
  }

  private async deleteAction() {
    this.loading = true;

    try {
      await api.delete(this.apiUrl);

      addToast(translate('removed'), NotificationType.INFO);
    } catch (error) {
      console.error(`Error encountered when deleting action: ${error}`);
    }

    this.dispatchEvent(
      new EntityItemDeletedEvent({
        id: this.entityId,
      }),
    );

    this.loading = false;
  }

  private handleSaveClick(_e: CustomEvent) {
    this.saveAction();
  }

  private handleDeleteClick(_e: CustomEvent) {
    this.confirmModalShown = true;
  }

  private handleTagsUpdated(e: TagsUpdatedEvent) {
    this.tags = e.detail.tags;

    this.state.setTagSuggestions(
      this.state.tagSuggestions.filter(suggestion =>
        this.tags.includes(suggestion),
      ),
    );
  }

  private async handleTagSuggestionsRequested(e: TagSuggestionsRequestedEvent) {
    const value = e.detail.value;
    if (
      (!this.lastInput.tag.hadResults &&
        value.startsWith(this.lastInput.tag.value)) ||
      !this.tagSuggestionsEnabled
    ) {
      this.tagSuggestions = [];
      return;
    }

    this.lastInput.tag.hadResults = false;
    this.lastInput.tag.value = value;

    let tags: string[] = [];

    if (value.length >= this.minLengthForSuggestion) {
      const result = await api.get<{ tags: string[] }>(`tag/${value}`);
      if (result) {
        tags = result.response.tags;
      }
    }

    if (tags.length || value === '') {
      this.lastInput.tag.hadResults = true;
    }

    this.tagSuggestions = tags;
  }

  private handleTypeChanged(e: SelectChangedEvent<string>) {
    this.type = parseInt(e.detail.value);
    this.propertiesSetup = false;
    this.propertyInstances = [];
  }

  private handlePropertyChanged(e: PropertyChangedEvent) {
    const { value, uiId } = e.detail;

    const propertyInstance = this.propertyInstances.find(
      property => property.uiId === uiId,
    );

    if (!propertyInstance) {
      return;
    }

    propertyInstance.value = value;
  }

  private handlePropertyCloned(e: PropertyClonedEvent) {
    const { uiId } = e.detail;
    const propertyInstanceIndex = this.propertyInstances.findIndex(
      property => property.uiId === uiId,
    );

    const propertyInstances = [
      ...this.propertyInstances.slice(0, propertyInstanceIndex + 1),
      { ...this.propertyInstances[propertyInstanceIndex], uiId: uuidv4() },
      ...this.propertyInstances.slice(propertyInstanceIndex + 1),
    ];

    this.propertyInstances = propertyInstances;
  }

  private handlePropertyDeleted(e: PropertyDeletedEvent) {
    const { uiId } = e.detail;

    const instanceToRemove = this.propertyInstances.find(
      property => property.uiId === uiId,
    );

    if (!instanceToRemove) {
      return;
    }

    this.propertyInstances = this.propertyInstances.filter(
      property => property.uiId !== uiId,
    );

    this.state.setEntityPropertyInstance(
      instanceToRemove.propertyConfig.id,
      this.state.entityPropertyInstances[instanceToRemove.propertyConfig.id] -
        1,
    );
  }

  private addProperty() {
    console.log('addProperty');
  }

  renderPropertyField(propertyInstance: PropertyInstance) {
    console.log('renderPropertyField', propertyInstance);

    const { propertyConfig, uiId } = propertyInstance;
    if (!propertyConfig) {
      return nothing;
    }

    return html`<property-field
      .value=${propertyInstance.value}
      uiId=${uiId}
      entityConfigId=${propertyConfig.entityConfigId}
      propertyConfigId=${propertyConfig.id}
      @property-changed=${this.handlePropertyChanged}
      @property-cloned=${this.handlePropertyCloned}
      @property-deleted=${this.handlePropertyDeleted}
    ></property-field>`;
  }

  render() {
    return html`
      <form class=${classMap(this.classes)}>
        <div class="type">
          <ss-select
            selected=${this.type}
            @select-changed=${this.handleTypeChanged}
            .options=${[
              { label: 'Select an entity', value: '0' },
              ...this.state.entityConfigs.map(entity => ({
                label: entity.name,
                value: entity.id,
              })),
            ]}
          ></ss-select>
        </div>

        <div class="properties">
          ${this.propertyInstances.length && this.entityConfig
            ? repeat(
                this.propertyInstances,
                propertyInstance => propertyInstance.propertyConfig.id,
                propertyInstance =>
                  html`${this.renderPropertyField(propertyInstance)}`,
              )
            : nothing}
        </div>

        <tag-manager
          ?enableSuggestions=${this.tagSuggestionsEnabled}
          value=${this.tagValue}
          @tags-updated=${this.handleTagsUpdated}
          @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
        >
          <div slot="tags">
            ${repeat(
              this.tagsAndSuggestions,
              tag => tag,
              tag => html`<data-item>${tag}</data-item>`,
            )}
          </div>

          <div slot="suggestions">
            ${repeat(
              this.tagSuggestions,
              suggestion => suggestion,
              suggestion => html`<data-item>${suggestion}</data-item>`,
            )}
          </div>
        </tag-manager>

        <div class="buttons">
          <ss-button ?disabled=${this.canAddProperty} @click=${this.addProperty}
            >${translate('addProperty')}</ss-button
          >

          <ss-button
            ?positive=${!this.entityId || this.hasChanged}
            @click=${this.handleSaveClick}
            text=${this.entityId
              ? this.hasChanged
                ? translate('update')
                : translate('cancel')
              : translate('add')}
            ?loading=${this.loading}
          ></ss-button>

          ${this.entityId
            ? html`
                <ss-button
                  negative
                  @click=${this.handleDeleteClick}
                  text=${translate('delete')}
                ></ss-button>

                <confirmation-modal
                  @confirmation-accepted=${this.deleteAction}
                  @confirmation-declined=${() =>
                    (this.confirmModalShown = false)}
                  ?open=${this.confirmModalShown}
                ></confirmation-modal>
              `
            : nothing}
        </div>
      </form>
    `;
  }
}
