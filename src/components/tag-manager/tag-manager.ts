import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { TagsUpdatedEvent } from './tag-manager.events';

import '@/components/tag-manager/tag-input/tag-input';
import '@/components/tag-manager/tag-list/tag-list';

import { theme } from '@/styles/theme';
import { msg } from '@lit/localize';
import {
  TagManagerProp,
  tagManagerProps,
  TagManagerProps,
} from './tag-manager.models';
import {
  TagAddedEvent,
  TagInputUpdatedEvent,
  TagSuggestionsUpdatedEvent,
} from './tag-input/tag-input.events';
import { repeat } from 'lit/directives/repeat.js';

@customElement('tag-manager')
export class TagManager extends LitElement {
  static styles = [
    theme,
    css`
      .tag-manager {
        border-radius: 0.25rem;
        border: 1px #ccc solid;
      }

      .no-tags {
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.75rem;
      }

      slot {
        display: none;
      }
    `,
  ];

  /*
  @property({ type: Array, reflect: true })
  [TagManagerProp.TAGS]: TagManagerProps[TagManagerProp.TAGS] =
    tagManagerProps[TagManagerProp.TAGS].default;
    */

  @property({ type: String, reflect: true })
  [TagManagerProp.VALUE]: TagManagerProps[TagManagerProp.VALUE] =
    tagManagerProps[TagManagerProp.VALUE].default;

  @property({ type: Boolean, reflect: true })
  [TagManagerProp.ENABLE_SUGGESTIONS]: TagManagerProps[TagManagerProp.ENABLE_SUGGESTIONS] =
    tagManagerProps[TagManagerProp.ENABLE_SUGGESTIONS].default;

  @state() tags: string[] = [];
  @state() suggestions: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
  }

  private setupTagsMutationObserver(): void {
    const tagsSlot = this.shadowRoot?.querySelector('slot[name="tags"]');
    if (!tagsSlot) {
      return;
    }

    const slottedElements = (tagsSlot as HTMLSlotElement).assignedElements();

    const observer = new MutationObserver(() => {
      this.syncSlotTags();
    });

    slottedElements.forEach(element => {
      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    });
  }

  private setupSuggestionsMutationObserver(): void {
    const suggestionsSlot = this.shadowRoot?.querySelector(
      'slot[name="suggestions"]',
    );
    if (!suggestionsSlot) {
      return;
    }

    const slottedElements = (
      suggestionsSlot as HTMLSlotElement
    ).assignedElements();

    const observer = new MutationObserver(() => {
      console.log('suggestions slot changed');
      this.syncSlotSuggestions();
    });

    slottedElements.forEach(element => {
      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    });
  }

  async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(_changedProperties);
    await this.updateComplete;

    const tagsSlotNode = this.shadowRoot?.querySelector('slot[name="tags"]');
    if (tagsSlotNode) {
      console.log('tags slot found');
      tagsSlotNode.addEventListener('slotchange', () => {
        console.log('tags slot changed');
        this.syncSlotTags();
      });
    }

    this.setupTagsMutationObserver();
    this.setupSuggestionsMutationObserver();

    this.syncSlotTags();

    const suggestionsSlotNode = this.shadowRoot?.querySelector(
      'slot[name="suggestions"]',
    );
    if (suggestionsSlotNode) {
      console.log('suggestions slot found');
      suggestionsSlotNode.addEventListener('slotchange', () => {
        console.log('suggestions slot changed');
        this.syncSlotSuggestions();
      });
    }

    this.syncSlotSuggestions();
  }

  private syncSlotTags() {
    this.tags = [];
    this.querySelectorAll('data-item').forEach(item => {
      this.tags.push(item.textContent || '');
    });
    console.log('tags', this.tags);
  }

  private syncSlotSuggestions() {
    this.tags = [];
    this.querySelectorAll('data-item').forEach(item => {
      this.tags.push(item.textContent || '');
    });
    console.log('suggestions', this.tags);
  }

  private handleTagAdded(e: TagAddedEvent) {
    this.tags = [...this.tags, e.detail.tag];
    this._sendUpdatedEvent();
  }

  private _handleDeleted(e: CustomEvent) {
    this.tags = this.tags.filter(tag => tag !== e.detail.value);
    this._sendUpdatedEvent();
  }

  private handleInputUpdated(e: TagInputUpdatedEvent) {
    this.value = e.detail.value;
  }

  private handleSuggestionsUpdated(e: TagSuggestionsUpdatedEvent) {
    this.suggestions = e.detail.suggestions;
  }

  private _sendUpdatedEvent() {
    this.dispatchEvent(new TagsUpdatedEvent({ tags: this.tags }));
  }

  render() {
    return html`
      <fieldset class="tag-manager">
        <legend>${msg('Tags')}</legend>

        <tag-input
          value=${this.value}
          ?enableSuggestions=${this.enableSuggestions}
          @tag-input-updated=${this.handleInputUpdated}
          @tag-added=${this.handleTagAdded}
          @tag-suggestions-updated=${this.handleSuggestionsUpdated}
        >
          ${repeat(
            this.suggestions,
            suggestion => suggestion,
            suggestion => html` <data-item>${suggestion}</data-item> `,
          )}
        </tag-input>

        ${this.tags.length
          ? html` <tag-list
              .tags=${this.tags}
              @deleted=${(e: CustomEvent) => {
                this._handleDeleted(e);
              }}
            ></tag-list>`
          : html`<div class="no-tags">${msg('No tags are set')}</div>`}
        <slot name="tags"></slot>
        <slot name="suggestions"></slot>
      </fieldset>
    `;
  }
}
