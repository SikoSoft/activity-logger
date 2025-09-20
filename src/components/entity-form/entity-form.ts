import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';
import { repeat } from 'lit/directives/repeat.js';
import { v4 as uuidv4 } from 'uuid';

import { ListFilterType } from 'api-spec/models/List';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import {
  DataType,
  EntityConfig,
  EntityItem,
  EntityPropertyConfig,
  ImageEntityPropertyConfig,
  ItemProperty,
  LongTextEntityPropertyConfig,
  ShortTextEntityPropertyConfig,
} from 'api-spec/models/Entity';
import { appState } from '@/state';
import { Time } from '@/lib/Time';
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
} from './entity-form.models';
import { addToast } from '@/lib/Util';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@ss/ui/components/tag-manager';
import '@/components/confirm-modal/confirm-modal';
import '@/components/entity-form/text-field/text-field';
import '@/components/entity-form/int-field/int-field';
import '@/components/entity-form/image-field/image-field';

import {
  EntityItemCanceledEvent,
  EntityItemDeletedEvent,
  EntityItemUpdatedEvent,
  ItemPropertyUpdatedEvent,
} from './entity-form.events';
import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';
import { TagSuggestionsRequestedEvent } from '@ss/ui/components/tag-input.events';
import { SelectChangedEvent } from '@ss/ui/components/ss-select.events';

import { theme } from '@/styles/theme';
import {
  PropertyClonedEvent,
  PropertyDeletedEvent,
} from './property-field/property-field.events';

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

  @property()
  [EntityFormProp.DESC]: EntityFormProps[EntityFormProp.DESC] =
    entityFormProps[EntityFormProp.DESC].default;

  @property()
  [EntityFormProp.OCCURRED_AT]: EntityFormProps[EntityFormProp.OCCURRED_AT] =
    entityFormProps[EntityFormProp.OCCURRED_AT].default;

  @property({ type: Array })
  [EntityFormProp.TAGS]: EntityFormProps[EntityFormProp.TAGS] =
    entityFormProps[EntityFormProp.TAGS].default;

  @property()
  [EntityFormProp.TAG_VALUE]: EntityFormProps[EntityFormProp.TAG_VALUE] =
    entityFormProps[EntityFormProp.TAG_VALUE].default;

  @property({ type: Array })
  [EntityFormProp.PROPERTIES]: EntityFormProps[EntityFormProp.PROPERTIES] =
    entityFormProps[EntityFormProp.PROPERTIES].default;

  @state() initialDesc: string = '';
  @state() initialOccurredAt: string = '';
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
    //console.log('Get entity config for type:', this.type);
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

    this.desc = this.desc.trim();
    this.occurredAt = Time.formatDateTime(new Date(this.occurredAt));
    this.initialDesc = this.desc;
    this.initialOccurredAt = this.occurredAt;
    this.initialTags = JSON.stringify(this.tags);
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
    if (this.entityConfig && !this.propertyInstances.length) {
      this.propertyInstances = this.entityConfig.properties.map(
        propertyConfig => ({
          propertyConfig,
          instanceId: 0,
          uiId: uuidv4(),
        }),
      );
    }
  }

  get apiUrl(): string {
    return this.entityId ? `entity/${this.entityId}` : `entity`;
  }

  @state()
  get hasChanged(): boolean {
    return (
      this.desc.trim() !== this.initialDesc ||
      this.occurredAt !== this.initialOccurredAt ||
      JSON.stringify(this.tagsAndSuggestions) !== this.initialTags
    );
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
    return this.properties.filter(prop => prop.propertyId === type).length || 0;
  }

  private async saveAction() {
    this.loading = true;
    const desc = this.desc.trim();

    try {
      if (desc && this.hasChanged) {
        const occurredAt = this.occurredAt;
        const timeZone = new Date().getTimezoneOffset();

        const payload: RequestBody = {
          desc,
          occurredAt,
          timeZone,
          tags: this.tagsAndSuggestions,
          properties: this.properties,
        };

        const result = this.entityId
          ? await api.put<RequestBody, EntityItem>(this.apiUrl, payload)
          : await api.post<RequestBody, EntityItem>(this.apiUrl, payload);

        this.reset();
        this.loading = false;

        if (!result) {
          return;
        }

        this.dispatchEvent(
          new EntityItemUpdatedEvent({
            id: this.entityId,
            desc,
            tags: this.tags,
          }),
        );

        addToast(
          this.entityId ? msg('Updated!') : msg('Added!'),
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
    this.desc = '';
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

      addToast(msg('Removed!'), NotificationType.INFO);
    } catch (error) {
      console.error(`Error encountered when deleting action: ${error}`);
    }

    this.dispatchEvent(
      new EntityItemDeletedEvent({
        id: this.entityId,
      }),
    );

    this.desc = '';
    this.loading = false;
  }

  private async requestActionSuggestions(): Promise<void> {
    if (
      !this.lastInput.action.hadResults &&
      this.desc.startsWith(this.lastInput.action.value)
    ) {
      this.state.setActionSuggestions([]);
      return;
    }

    try {
      this.lastInput.action.hadResults = false;
      let suggestions: string[] = [];

      if (this.desc.length >= this.minLengthForSuggestion) {
        const result = await api.get<{ suggestions: string[] }>(
          `actionSuggestion/${this.desc}`,
        );
        if (result) {
          suggestions = result.response.suggestions;
        }
      }

      if (suggestions.length || this.desc === '') {
        this.lastInput.action.hadResults = true;
      }

      this.state.setActionSuggestions(suggestions);
    } catch (error) {
      console.error(
        `Failed to get action suggestions: ${JSON.stringify(error)}`,
      );
    }

    this.lastInput.action.value = this.desc;
  }

  private async requestTagSuggestions(): Promise<void> {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    const initialDesc = this.desc;

    if (initialDesc.length === 0 || !this.tagSuggestionsEnabled) {
      this.state.setTagSuggestions([]);
      return;
    }

    try {
      const result = await api.get<{ suggestions: string[] }>(
        `tagSuggestion/${initialDesc}`,
        { signal: this.abortController.signal },
      );

      let suggestions: string[] = [];
      if (result) {
        suggestions = result.response.suggestions;
      }

      if (initialDesc !== this.desc) {
        return;
      }

      this.state.setTagSuggestions(
        suggestions.filter(suggestion => !this.tags.includes(suggestion)),
      );
    } catch (error) {
      console.error(`Failed to get tag suggestions: ${JSON.stringify(error)}`);
    }
  }

  private syncSuggestions(reset: boolean = false) {
    if (reset) {
      this.state.setTagSuggestions([]);
      this.state.setActionSuggestions([]);
    }
    this.requestTagSuggestions();
    this.requestActionSuggestions();
  }

  sync(reset: boolean = false) {
    this.syncSuggestions(reset);
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
  }

  private handlePropertyUpdated(e: ItemPropertyUpdatedEvent<ItemProperty>) {
    const updatedProperty = e.detail;
    const existingIndex = this.properties.findIndex(
      property => property.propertyId === updatedProperty.propertyId,
    );

    if (existingIndex > -1) {
      this.properties[existingIndex] = updatedProperty;
    } else {
      this.properties.push(updatedProperty);
    }
  }

  private handlePropertyChanged(e: CustomEvent) {
    console.log('Property changed:', e.detail);
    const propertyId = e.detail.id;
    const value = e.detail.value;

    this.properties = this.properties.map(property =>
      property.propertyId === propertyId ? { ...property, value } : property,
    );
  }

  private handlePropertyCloned(e: PropertyClonedEvent) {
    const { uiId } = e.detail;
    console.log('Property cloned:', uiId);
  }

  private handlePropertyDeleted(e: PropertyDeletedEvent) {
    const { uiId } = e.detail;
    console.log('Property deleted:', uiId);
    const index = this.propertyInstances.findIndex(
      property => property.uiId === uiId,
    );
    if (index > -1) {
      this.propertyInstances.splice(index, 1);
      this.propertyInstances = [...this.propertyInstances];
    }
  }

  private addProperty() {
    console.log('addProperty');
  }

  renderPropertyField(propertyInstance: PropertyInstance) {
    const { propertyConfig, uiId } = propertyInstance;
    if (!propertyConfig) {
      return nothing;
    }

    switch (propertyConfig.dataType) {
      case DataType.IMAGE:
        return html`<image-field
          src=${propertyConfig.defaultValue.src}
          alt=${propertyConfig.defaultValue.alt}
          .propertyConfig=${propertyConfig as ImageEntityPropertyConfig}
          @property-changed=${this.handlePropertyChanged}
        ></image-field>`;
      case DataType.SHORT_TEXT:
        return html`<text-field
          value=${propertyConfig.defaultValue}
          uiId=${uiId}
          entityConfigId=${propertyConfig.entityConfigId}
          propertyConfigId=${propertyConfig.id}
          @property-changed=${this.handlePropertyChanged}
          @property-cloned=${this.handlePropertyCloned}
          @property-deleted=${this.handlePropertyDeleted}
        ></text-field>`;
      case DataType.LONG_TEXT:
        return html`<text-field
          value=${propertyConfig.defaultValue}
          .propertyConfig=${propertyConfig as LongTextEntityPropertyConfig}
          @property-changed=${this.handlePropertyChanged}
        ></text-field>`;
      case DataType.INT:
        return html`<int-field
          value=${propertyConfig.defaultValue}
          .propertyConfig=${propertyConfig}
          @property-changed=${this.handlePropertyChanged}
        ></int-field>`;
    }

    return nothing;
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
          ${this.properties.length
            ? repeat(
                this.properties,
                property => property.propertyId,
                property =>
                  html`<item-property-form
                    propertyId=${property.propertyId}
                    .value=${property.value}
                    @item-property-updated=${this.handlePropertyUpdated}
                  ></item-property-form>`,
              )
            : nothing}
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
            >${msg('Add Property')}</ss-button
          >

          <ss-button
            ?positive=${!this.entityId || this.hasChanged}
            @click=${this.handleSaveClick}
            text=${this.entityId
              ? this.hasChanged
                ? msg('Update')
                : msg('Cancel')
              : msg('Add')}
            ?loading=${this.loading}
          ></ss-button>

          ${this.entityId
            ? html`
                <ss-button
                  negative
                  @click=${this.handleDeleteClick}
                  text=${msg('Delete')}
                ></ss-button>

                <action-confirm-modal
                  @confirm=${this.deleteAction}
                  @cancel=${() => (this.confirmModalShown = false)}
                  ?open=${this.confirmModalShown}
                ></action-confirm-modal>
              `
            : nothing}
        </div>
      </form>
    `;
  }
}
