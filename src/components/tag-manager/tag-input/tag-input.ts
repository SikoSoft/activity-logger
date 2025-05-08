import { css, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { api } from '@/lib/Api';
import { appState } from '@/state';

import '@/components/tag-manager/tag-input/tag-input';
import '@/components/tag-manager/tag-list/tag-list';

import { theme } from '@/styles/theme';
import { TagInputProp, tagInputProps, TagInputProps } from './tag-input.models';
import { SettingName, TagSuggestions } from 'api-spec/models/Setting';
import {
  TagAddedEvent,
  TagInputUpdatedEvent,
  TagSuggestionsRequestedEvent,
  TagSuggestionsUpdatedEvent,
} from './tag-input.events';

@customElement('tag-input')
export class TagInput extends MobxLitElement {
  private state = appState;
  private minInput = 1;
  private suggestionTimeout: ReturnType<typeof setTimeout> | null = null;

  static styles = [
    theme,
    css`
      #data-slot {
        display: none;
      }

      .tag-input {
        display: flex;
      }

      ss-input {
        flex-grow: 7;
      }

      ss-button {
        flex-grow: 3;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  [TagInputProp.VALUE]: TagInputProps[TagInputProp.VALUE] =
    tagInputProps[TagInputProp.VALUE].default;

  @state() suggestions: string[] = [];
  @state() lastInputHadResults: boolean = true;
  @state() lastInput: string = '';

  get showButton(): boolean {
    return this.value.length > 0;
  }

  @state()
  get tagSuggestionsEnabled(): boolean {
    return (
      this.state.listConfig.setting[SettingName.TAG_SUGGESTIONS] !==
      TagSuggestions.DISABLED
    );
  }

  async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(_changedProperties);
    await this.updateComplete;

    const slotNode = this.shadowRoot?.querySelector('slot');
    if (slotNode) {
      slotNode.addEventListener('slotchange', () => {
        this.syncSlotItems();
      });
    }

    this.syncSlotItems();
  }

  private syncSlotItems() {
    this.suggestions = [];
    this.querySelectorAll('data-item').forEach(item => {
      this.suggestions.push(item.textContent || '');
    });
  }

  private _handleSubmitted() {
    this._save();
  }

  private async _handleChanged(e: CustomEvent) {
    this.value = e.detail.value;

    this.dispatchEvent(
      new TagInputUpdatedEvent({
        value: this.value,
      }),
    );

    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }
    this.suggestionTimeout = setTimeout(() => {
      this._requestSuggestions();
    }, 200);
  }

  private async _requestSuggestions() {
    if (
      (!this.lastInputHadResults && this.value.startsWith(this.lastInput)) ||
      !this.tagSuggestionsEnabled
    ) {
      this.setSuggestions([]);
      return;
    }

    this.lastInputHadResults = false;
    this.lastInput = this.value;

    let tags: string[] = [];

    if (this.value.length >= this.minInput) {
      this.dispatchEvent(
        new TagSuggestionsRequestedEvent({ value: this.value }),
      );

      /*
      const result = await api.get<{ tags: string[] }>(`tag/${this.value}`);
      if (result) {
        tags = result.response.tags;
      }
        */
    }

    if (tags.length || this.value === '') {
      this.lastInputHadResults = true;
    }

    this.setSuggestions(tags);
  }

  setSuggestions(suggestions: string[]) {
    this.dispatchEvent(new TagSuggestionsUpdatedEvent({ suggestions }));
  }

  private _handleSaveClick(e: CustomEvent) {
    this._save();
  }

  private _save() {
    this._sendAddedEvent();
    this.value = '';
  }

  private _sendAddedEvent() {
    this.dispatchEvent(
      new TagAddedEvent({
        tag: this.value,
      }),
    );
  }

  render() {
    return html`
      <div class="tag-input">
        <slot id="data-slot"></slot>

        <ss-input
          @input-submitted=${this._handleSubmitted}
          @input-changed=${this._handleChanged}
          placeholder="Tag"
          value=${this.value}
          .suggestions=${this.suggestions}
          autoComplete
        ></ss-input>

        ${this.showButton
          ? html`
              <ss-button text="Add" @click=${this._handleSaveClick}></ss-button>
            `
          : nothing}
      </div>
    `;
  }
}
