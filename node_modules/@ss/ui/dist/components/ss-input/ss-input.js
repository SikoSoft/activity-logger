var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e, _f, _g, _h;
import { LitElement, html, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputType } from '../../models/Input';
import { SSInputProp, ssInputProps } from './ss-input.models';
import { InputChangedEvent, InputSubmittedEvent } from './ss-input.events';
import '../ss-input-auto/ss-input-auto';
import { theme } from '../../styles/theme';
let SSInput = class SSInput extends LitElement {
    constructor() {
        super(...arguments);
        this.clickFocusHandler = (event) => { };
        this[_a] = ssInputProps[SSInputProp.TYPE].default;
        this[_b] = ssInputProps[SSInputProp.VALUE].default;
        this[_c] = ssInputProps[SSInputProp.AUTO_COMPLETE].default;
        this[_d] = ssInputProps[SSInputProp.PLACEHOLDER].default;
        this[_e] = ssInputProps[SSInputProp.SUGGESTIONS].default;
        this._value = this.value;
        this.hasFocus = false;
        this.autoDismissed = false;
        this.handleChange = (e) => {
            let value = '';
            if (e.target instanceof HTMLInputElement) {
                value = e.target.value;
            }
            this._value = value;
            if (e.target instanceof HTMLInputElement) {
                e.target.value = this._value;
            }
            e.preventDefault();
            return false;
        };
        this.handleKeyDown = (e) => {
            if (!(e.target instanceof HTMLInputElement)) {
                return;
            }
            switch (e.code) {
                case 'Tab':
                    this.autoDismissed = true;
                    return;
                case 'ArrowUp':
                    this.sendSuggestionUpEvent(e);
                    return;
                case 'ArrowDown':
                    this.sendSuggestionDownEvent(e);
                    return;
                case 'Enter':
                    if (this.showAutoComplete) {
                        this.sendSuggestionSelectEvent();
                    }
                    else {
                        this.sendSubmittedEvent();
                    }
                    e.preventDefault();
                    return;
            }
        };
        this.handleInput = (e) => {
            let value = '';
            if (e.target instanceof HTMLInputElement) {
                value = e.target.value;
            }
            this.dispatchEvent(new InputChangedEvent({
                value,
            }));
            this._value = value;
            this.autoDismissed = false;
            return true;
        };
        this.handleFocus = (e) => {
            this.hasFocus = true;
            this.autoDismissed = false;
        };
        this.handleBlur = (e) => {
            setTimeout(() => {
                this.hasFocus = false;
            }, 200);
        };
        this.suggestionSelectHandler = (e) => {
            this.autoDismissed = true;
            this.inputField.value = e.detail.value;
            this.inputField.dispatchEvent(new InputChangedEvent({ value: e.detail.value }));
        };
    }
    static { _a = SSInputProp.TYPE, _b = SSInputProp.VALUE, _c = SSInputProp.AUTO_COMPLETE, _d = SSInputProp.PLACEHOLDER, _e = SSInputProp.SUGGESTIONS, _f = SSInputProp.MIN, _g = SSInputProp.MAX, _h = SSInputProp.STEP; }
    static { this.styles = [
        theme,
        css `
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `,
    ]; }
    get showAutoComplete() {
        return this.autoComplete && !this.autoDismissed && this.value.length > 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.clickFocusHandler = (event) => {
            const withinBoundaries = event.composedPath().includes(this.container);
            if (!withinBoundaries) {
                this.autoDismissed = true;
            }
            if (this.type === InputType.NUMBER) {
                this.min = ssInputProps[SSInputProp.MIN].default;
                this.max = ssInputProps[SSInputProp.MAX].default;
                this.step = ssInputProps[SSInputProp.STEP].default;
            }
        };
        window.addEventListener('mousedown', this.clickFocusHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mousedown', this.clickFocusHandler);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.inputField.value = this.value;
        }
    }
    focus() {
        this.inputField.focus();
    }
    clear() {
        this.inputField.value = '';
        this.dispatchEvent(new InputChangedEvent({
            value: '',
        }));
    }
    sendSuggestionUpEvent(e) {
        if (!this.autoCompleteNode) {
            return;
        }
        this.autoCompleteNode.dispatchEvent(new CustomEvent('select-up'));
        e.preventDefault();
    }
    sendSuggestionDownEvent(e) {
        if (!this.autoCompleteNode) {
            return;
        }
        this.autoCompleteNode.dispatchEvent(new CustomEvent('select-down'));
        e.preventDefault();
    }
    sendSuggestionSelectEvent() {
        if (!this.autoCompleteNode) {
            return;
        }
        this.autoCompleteNode.dispatchEvent(new CustomEvent('select'));
    }
    sendSubmittedEvent() {
        this.inputField.dispatchEvent(new InputSubmittedEvent({ value: this._value }));
    }
    handleSubmit() {
        this.sendSubmittedEvent();
    }
    render() {
        return html `
      <span part="container">
        <input
          part="input"
          type=${this.type}
          value=${this.value}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          autocomplete="off"
          autocapitalize="off"
        />
        ${this.showAutoComplete
            ? html `
              <ss-input-auto
                input=${this._value}
                .suggestions=${this.suggestions}
                @suggestion-submitted=${this.handleSubmit}
                @suggestion-changed=${this.suggestionSelectHandler}
              ></ss-input-auto>
            `
            : nothing}
      </span>
    `;
    }
};
__decorate([
    property()
], SSInput.prototype, _a, void 0);
__decorate([
    property()
], SSInput.prototype, _b, void 0);
__decorate([
    property({ type: Boolean })
], SSInput.prototype, _c, void 0);
__decorate([
    property()
], SSInput.prototype, _d, void 0);
__decorate([
    property({ type: Array })
], SSInput.prototype, _e, void 0);
__decorate([
    property({ type: Number, reflect: true })
], SSInput.prototype, _f, void 0);
__decorate([
    property({ type: Number, reflect: true })
], SSInput.prototype, _g, void 0);
__decorate([
    property({ type: Number, reflect: true })
], SSInput.prototype, _h, void 0);
__decorate([
    state()
], SSInput.prototype, "_value", void 0);
__decorate([
    query('input')
], SSInput.prototype, "inputField", void 0);
__decorate([
    query('ss-input-auto')
], SSInput.prototype, "autoCompleteNode", void 0);
__decorate([
    query('span')
], SSInput.prototype, "container", void 0);
__decorate([
    state()
], SSInput.prototype, "hasFocus", void 0);
__decorate([
    state()
], SSInput.prototype, "autoDismissed", void 0);
__decorate([
    state()
], SSInput.prototype, "showAutoComplete", null);
SSInput = __decorate([
    customElement('ss-input')
], SSInput);
export { SSInput };
//# sourceMappingURL=ss-input.js.map