var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TagsUpdatedEvent } from './tag-manager.events';
import './tag-input/tag-input';
import './tag-list/tag-list';
import { theme } from '../../styles/theme';
import { TagManagerProp, tagManagerProps, } from './tag-manager.models';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '../../util/msg';
let TagManager = class TagManager extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = tagManagerProps[TagManagerProp.VALUE].default;
        this[_b] = tagManagerProps[TagManagerProp.ENABLE_SUGGESTIONS].default;
        this.tags = [];
        this.suggestions = [];
    }
    static { _a = TagManagerProp.VALUE, _b = TagManagerProp.ENABLE_SUGGESTIONS; }
    static { this.styles = [
        theme,
        css `
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
    ]; }
    connectedCallback() {
        super.connectedCallback();
    }
    setupTagsMutationObserver() {
        const tagsSlot = this.shadowRoot?.querySelector('slot[name="tags"]');
        if (!tagsSlot) {
            return;
        }
        const slottedElements = tagsSlot.assignedElements();
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
    setupSuggestionsMutationObserver() {
        const suggestionsSlot = this.shadowRoot?.querySelector('slot[name="suggestions"]');
        if (!suggestionsSlot) {
            return;
        }
        const slottedElements = suggestionsSlot.assignedElements();
        const observer = new MutationObserver(() => {
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
    async firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        await this.updateComplete;
        const tagsSlotNode = this.shadowRoot?.querySelector('slot[name="tags"]');
        if (tagsSlotNode) {
            tagsSlotNode.addEventListener('slotchange', () => {
                this.syncSlotTags();
            });
        }
        this.setupTagsMutationObserver();
        this.setupSuggestionsMutationObserver();
        this.syncSlotTags();
        const suggestionsSlotNode = this.shadowRoot?.querySelector('slot[name="suggestions"]');
        if (suggestionsSlotNode) {
            suggestionsSlotNode.addEventListener('slotchange', () => {
                this.syncSlotSuggestions();
            });
        }
        this.syncSlotSuggestions();
    }
    syncSlotTags() {
        this.tags = [];
        this.querySelectorAll('[slot="tags"] data-item').forEach(item => {
            this.tags.push(item.textContent || '');
        });
    }
    syncSlotSuggestions() {
        this.suggestions = [];
        this.querySelectorAll('[slot="suggestions"] data-item').forEach(item => {
            this.suggestions.push(item.textContent || '');
        });
    }
    handleTagAdded(e) {
        this.tags = [...this.tags, e.detail.tag];
        this.sendUpdatedEvent();
    }
    handleDeleted(e) {
        this.tags = this.tags.filter(tag => tag !== e.detail.tag);
        this.sendUpdatedEvent();
    }
    handleInputUpdated(e) {
        this.value = e.detail.value;
    }
    handleSuggestionsUpdated(e) {
        this.suggestions = e.detail.suggestions;
    }
    sendUpdatedEvent() {
        this.dispatchEvent(new TagsUpdatedEvent({ tags: this.tags }));
    }
    render() {
        return html `
      <fieldset class="tag-manager">
        <legend>${msg('Tags')}</legend>

        <tag-input
          value=${this.value}
          ?enableSuggestions=${this.enableSuggestions}
          @tag-input-updated=${this.handleInputUpdated}
          @tag-added=${this.handleTagAdded}
          @tag-suggestions-updated=${this.handleSuggestionsUpdated}
        >
          ${repeat(this.suggestions, suggestion => suggestion, suggestion => html ` <data-item>${suggestion}</data-item> `)}
        </tag-input>

        ${this.tags.length
            ? html ` <tag-list
              .tags=${this.tags}
              @tag-deleted=${(e) => {
                this.handleDeleted(e);
            }}
            ></tag-list>`
            : html `<div class="no-tags">${msg('No tags are set')}</div>`}

        <slot name="tags"></slot>

        <slot name="suggestions"></slot>
      </fieldset>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], TagManager.prototype, _a, void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TagManager.prototype, _b, void 0);
__decorate([
    state()
], TagManager.prototype, "tags", void 0);
__decorate([
    state()
], TagManager.prototype, "suggestions", void 0);
TagManager = __decorate([
    customElement('tag-manager')
], TagManager);
export { TagManager };
//# sourceMappingURL=tag-manager.js.map