import { LitElement, css, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '../../ss-input/ss-input';
import '../tag-input/tag-input';

import { theme } from '../../../styles/theme';
import { TagInputProp, tagInputProps, TagInputProps } from './tag-input.models';
import {
  TagAddedEvent,
  TagInputUpdatedEvent,
  TagSuggestionsRequestedEvent,
} from './tag-input.events';

@customElement('tag-input')
export class TagInput extends LitElement {
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

  private handleSubmitted() {
    this.save();
  }

  private async handleChanged(e: CustomEvent) {
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
      this.requestSuggestions();
    }, 200);
  }

  private async requestSuggestions() {
    this.dispatchEvent(new TagSuggestionsRequestedEvent({ value: this.value }));
  }

  private handleSaveClick(e: CustomEvent) {
    this.save();
  }

  private save() {
    this.sendAddedEvent();
    this.value = '';
  }

  private sendAddedEvent() {
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
          @input-submitted=${this.handleSubmitted}
          @input-changed=${this.handleChanged}
          placeholder="Tag"
          value=${this.value}
          .suggestions=${this.suggestions}
          autoComplete
        ></ss-input>

        ${this.showButton
          ? html`
              <ss-button text="Add" @click=${this.handleSaveClick}></ss-button>
            `
          : nothing}
      </div>
    `;
  }
}
