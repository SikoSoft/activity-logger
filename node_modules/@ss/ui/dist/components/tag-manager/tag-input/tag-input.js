var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../../ss-input/ss-input';
import '../tag-input/tag-input';
import { theme } from '../../../styles/theme';
import { TagInputProp, tagInputProps } from './tag-input.models';
import { TagAddedEvent, TagInputUpdatedEvent, TagSuggestionsRequestedEvent, } from './tag-input.events';
let TagInput = class TagInput extends LitElement {
    constructor() {
        super(...arguments);
        this.suggestionTimeout = null;
        this[_a] = tagInputProps[TagInputProp.VALUE].default;
        this.suggestions = [];
        this.lastInputHadResults = true;
        this.lastInput = '';
    }
    static { _a = TagInputProp.VALUE; }
    static { this.styles = [
        theme,
        css `
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
    ]; }
    get showButton() {
        return this.value.length > 0;
    }
    async firstUpdated(_changedProperties) {
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
    syncSlotItems() {
        this.suggestions = [];
        this.querySelectorAll('data-item').forEach(item => {
            this.suggestions.push(item.textContent || '');
        });
    }
    handleSubmitted() {
        this.save();
    }
    async handleChanged(e) {
        this.value = e.detail.value;
        this.dispatchEvent(new TagInputUpdatedEvent({
            value: this.value,
        }));
        if (this.suggestionTimeout) {
            clearTimeout(this.suggestionTimeout);
        }
        this.suggestionTimeout = setTimeout(() => {
            this.requestSuggestions();
        }, 200);
    }
    async requestSuggestions() {
        this.dispatchEvent(new TagSuggestionsRequestedEvent({ value: this.value }));
    }
    handleSaveClick(e) {
        this.save();
    }
    save() {
        this.sendAddedEvent();
        this.value = '';
    }
    sendAddedEvent() {
        this.dispatchEvent(new TagAddedEvent({
            tag: this.value,
        }));
    }
    render() {
        return html `
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
            ? html `
              <ss-button text="Add" @click=${this.handleSaveClick}></ss-button>
            `
            : nothing}
      </div>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], TagInput.prototype, _a, void 0);
__decorate([
    state()
], TagInput.prototype, "suggestions", void 0);
__decorate([
    state()
], TagInput.prototype, "lastInputHadResults", void 0);
__decorate([
    state()
], TagInput.prototype, "lastInput", void 0);
TagInput = __decorate([
    customElement('tag-input')
], TagInput);
export { TagInput };
//# sourceMappingURL=tag-input.js.map