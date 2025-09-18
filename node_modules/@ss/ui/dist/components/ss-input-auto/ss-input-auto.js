var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
import { html, css, nothing, LitElement } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { SuggestionChangedEvent, SuggestionSubmittedEvent, } from './ss-input-auto.events';
import { theme } from '../../styles/theme';
import { SSInputAutoProp, ssInputAutoProps, } from './ss-input-auto.models';
let SSInputAuto = class SSInputAuto extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = ssInputAutoProps[SSInputAutoProp.INPUT].default;
        this[_b] = ssInputAutoProps[SSInputAutoProp.MIN_INPUT].default;
        this[_c] = ssInputAutoProps[SSInputAutoProp.MAX_MATCHES].default;
        this[_d] = ssInputAutoProps[SSInputAutoProp.SUGGESTIONS].default;
        this.selectedIndex = -1;
    }
    static { _a = SSInputAutoProp.INPUT, _b = SSInputAutoProp.MIN_INPUT, _c = SSInputAutoProp.MAX_MATCHES, _d = SSInputAutoProp.SUGGESTIONS; }
    static { this.styles = [
        theme,
        css `
      div {
        position: relative;
      }

      ul {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      }

      li {
        padding: 0.5rem;
        background-color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        color: #888;
        text-align: left;
      }

      li.selected {
        color: #000;
        background-color: #ddd;
      }
    `,
    ]; }
    get show() {
        return this.suggestions.length > 0 && this.input.length >= this.minInput;
    }
    get maxSelectedIndex() {
        return this.suggestions.length - 1;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('select-up', () => {
            this.adjustSelectedIndex(-1);
        });
        this.addEventListener('select-down', () => {
            this.adjustSelectedIndex(1);
        });
        this.addEventListener('select', () => {
            if (this.suggestions.length && this.selectedIndex !== -1) {
                this.sendSelectedEvent(this.suggestions[this.selectedIndex]);
            }
            else {
                this.sendSubmitEvent();
            }
        });
    }
    adjustSelectedIndex(adjustment) {
        let newIndex = this.selectedIndex + adjustment;
        if (newIndex < -1) {
            newIndex = this.maxSelectedIndex;
        }
        if (newIndex > this.maxSelectedIndex) {
            newIndex = -1;
        }
        this.selectedIndex = newIndex;
    }
    sendSelectedEvent(suggestion) {
        this.dispatchEvent(new SuggestionChangedEvent({ value: suggestion }));
    }
    sendSubmitEvent() {
        this.dispatchEvent(new SuggestionSubmittedEvent({ selectedIndex: this.selectedIndex }));
    }
    render() {
        return html `
      <div>
        ${this.show
            ? html ` <ul class="box">
              ${repeat(this.suggestions, suggestion => suggestion, (suggestion, index) => html `
                  <li
                    class=${index === this.selectedIndex ? 'selected' : ''}
                    @mouseover=${() => (this.selectedIndex = index)}
                    @click=${() => this.sendSelectedEvent(suggestion)}
                  >
                    ${suggestion}
                  </li>
                `)}
            </ul>`
            : nothing}
      </div>
    `;
    }
};
__decorate([
    property()
], SSInputAuto.prototype, _a, void 0);
__decorate([
    property({ type: Number })
], SSInputAuto.prototype, _b, void 0);
__decorate([
    property({ type: Number })
], SSInputAuto.prototype, _c, void 0);
__decorate([
    property({ type: Array })
], SSInputAuto.prototype, _d, void 0);
__decorate([
    state()
], SSInputAuto.prototype, "selectedIndex", void 0);
__decorate([
    state()
], SSInputAuto.prototype, "show", null);
SSInputAuto = __decorate([
    customElement('ss-input-auto')
], SSInputAuto);
export { SSInputAuto };
//# sourceMappingURL=ss-input-auto.js.map