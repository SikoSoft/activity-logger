import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';
import { InputType } from '@/models/Input';
import { Time } from '@/lib/Time';
import { api } from '@/lib/Api';

import { ViewElement } from '@/lib/ViewElement';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@/components/confirm-modal/confirm-modal';
import '@ss/ui/components/tag-manager';
import '@/components/mock-entities/item-property-form/item-property-form';

import { theme } from '@/styles/theme';
import { ListFilterType } from 'api-spec/models/List';
import { ActionItem } from '@/models/Action';
import {
  ActionFormProp,
  actionFormProps,
  ActionFormProps,
  RequestBody,
  SuggestionInputType,
  SuggestionLastInput,
} from './action-form.models';
import {
  ActionItemCanceledEvent,
  ActionItemDeletedEvent,
  ActionItemUpdatedEvent,
} from './action-form.events';
import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';
import { addToast } from '@/lib/Util';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import { repeat } from 'lit/directives/repeat.js';
import { TagSuggestionsRequestedEvent } from '@ss/ui/components/tag-input.events';

@customElement('action-form')
export class ActionForm extends ViewElement {
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

      .type,
      .properties {
        background-color: #ffeed0;
      }
    `,
  ];

  @property({ type: Number })
  [ActionFormProp.ACTION_ID]: ActionFormProps[ActionFormProp.ACTION_ID] =
    actionFormProps[ActionFormProp.ACTION_ID].default;

  @property({ type: Number })
  [ActionFormProp.TYPE]: ActionFormProps[ActionFormProp.TYPE] =
    actionFormProps[ActionFormProp.TYPE].default;

  @property()
  [ActionFormProp.DESC]: ActionFormProps[ActionFormProp.DESC] =
    actionFormProps[ActionFormProp.DESC].default;

  @property()
  [ActionFormProp.OCCURRED_AT]: ActionFormProps[ActionFormProp.OCCURRED_AT] =
    actionFormProps[ActionFormProp.OCCURRED_AT].default;

  @property({ type: Array })
  [ActionFormProp.TAGS]: ActionFormProps[ActionFormProp.TAGS] =
    actionFormProps[ActionFormProp.TAGS].default;

  @property()
  [ActionFormProp.TAG_VALUE]: ActionFormProps[ActionFormProp.TAG_VALUE] =
    actionFormProps[ActionFormProp.TAG_VALUE].default;

  @property({ type: Array })
  [ActionFormProp.PROPERTIES]: ActionFormProps[ActionFormProp.PROPERTIES] =
    actionFormProps[ActionFormProp.PROPERTIES].default;

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

  get apiUrl(): string {
    return this.actionId ? `action/${this.actionId}` : `action`;
  }

  @state()
  get hasChanged(): boolean {
    return (
      this.desc.trim() !== this.initialDesc ||
      this.occurredAt !== this.initialOccurredAt ||
      JSON.stringify(this.tagsAndSuggestions) !== this.initialTags
    );
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

        const result = this.actionId
          ? await api.put<RequestBody, ActionItem>(this.apiUrl, payload)
          : await api.post<RequestBody, ActionItem>(this.apiUrl, payload);

        this.reset();
        this.loading = false;

        if (!result) {
          return;
        }

        this.dispatchEvent(
          new ActionItemUpdatedEvent({
            id: this.actionId,
            desc,
            occurredAt: result.response.occurredAt,
            tags: this.tags,
          }),
        );

        addToast(
          this.actionId ? msg('Updated!') : msg('Added!'),
          NotificationType.SUCCESS,
        );
        return;
      }

      this.dispatchEvent(
        new ActionItemCanceledEvent({
          id: this.actionId,
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
    if (!this.actionId) {
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
      new ActionItemDeletedEvent({
        id: this.actionId,
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
      console.log(
        'Skipping action suggestions request due to no results and matching prefix',
      );
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
        console.log(
          'Initial desc does not match current desc, skipping update',
        );
        return;
      }

      this.state.setTagSuggestions(
        suggestions.filter(suggestion => !this.tags.includes(suggestion)),
      );
    } catch (error) {
      console.error(`Failed to get tag suggestions: ${JSON.stringify(error)}`);
    }
  }

  private async handleDescChanged(e: CustomEvent) {
    this.desc = e.detail.value;

    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }
    this.suggestionTimeout = setTimeout(() => {
      this.syncSuggestions();
    }, 150);
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

  private handleDescSubmitted(e: CustomEvent) {
    this.saveAction();
  }

  private handleOccurredAtChanged(e: CustomEvent) {
    this.occurredAt = e.detail.value;
  }

  private handleOccurredAtSubmitted(e: CustomEvent) {
    this.saveAction();
  }

  private handleSaveClick(e: CustomEvent) {
    this.saveAction();
  }

  private handleDeleteClick(e: CustomEvent) {
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

  render() {
    return html`
      <form class=${classMap(this.classes)}>
        <div>
          <ss-input
            @input-submitted=${this.handleDescSubmitted}
            @input-changed=${this.handleDescChanged}
            value=${this.desc}
            .suggestions=${this.state.actionSuggestions}
            autoComplete
          ></ss-input>
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

        ${this.actionId
          ? html`
              <div class="time">
                <ss-input
                  type=${InputType.DATETIME_LOCAL}
                  @input-submitted=${this.handleOccurredAtSubmitted}
                  @input-changed=${this.handleOccurredAtChanged}
                  value=${this.occurredAt}
                ></ss-input>
              </div>
            `
          : nothing}

        <div>
          <ss-button
            ?positive=${!this.actionId || this.hasChanged}
            @click=${this.handleSaveClick}
            text=${this.actionId
              ? this.hasChanged
                ? msg('Update')
                : msg('Cancel')
              : msg('Add')}
            ?loading=${this.loading}
          ></ss-button>

          ${this.actionId
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
