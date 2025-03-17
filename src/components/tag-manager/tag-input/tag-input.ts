import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';

import { api } from '@/lib/Api';
import { appState } from '@/state';

import '@/components/tag-manager/tag-input/tag-input';
import '@/components/tag-manager/tag-list/tag-list';

import { theme } from '@/styles/theme';
import { TagInputProp, tagInputProps, TagInputProps } from './tag-input.models';

@customElement('tag-input')
export class TagInput extends MobxLitElement {
  private state = appState;
  private minInput = 1;
  private suggestionTimeout: ReturnType<typeof setTimeout> | null = null;

  static styles = [
    theme,
    css`
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

  @state() lastInputHadResults: boolean = true;
  @state() lastInput: string = '';

  get showButton(): boolean {
    return this.value.length > 0;
  }

  private _handleSubmitted() {
    this._save();
  }

  private async _handleChanged(e: CustomEvent) {
    this.value = e.detail.value;

    this.dispatchEvent(
      new CustomEvent('changed', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    );

    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }
    this.suggestionTimeout = setTimeout(() => {
      this._requestSuggestions();
    }, 100);
  }

  private async _requestSuggestions() {
    if (!this.lastInputHadResults && this.value.startsWith(this.lastInput)) {
      this.state.setActionSuggestions([]);
      return;
    }

    this.lastInputHadResults = false;
    this.lastInput = this.value;

    let tags: string[] = [];

    if (this.value.length >= this.minInput) {
      const result = await api.get<{ tags: string[] }>(`tag/${this.value}`);
      if (result) {
        tags = result.response.tags;
      }
    }

    if (tags.length || this.value === '') {
      this.lastInputHadResults = true;
    }

    this.state.setActionSuggestions(tags);
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
      new CustomEvent('added', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    );
  }

  render() {
    return html`
      <div class="tag-input">
        <ss-input
          @input-submitted=${this._handleSubmitted}
          @input-changed=${this._handleChanged}
          placeholder="Tag"
          value=${this.value}
          .suggestions=${this.state.actionSuggestions}
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
