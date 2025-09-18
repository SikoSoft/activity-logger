var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e, _f;
import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../ss-loader/ss-loader';
import { theme } from '../../styles/theme';
import { SSButtonProp } from './ss-button.models';
let SSButton = class SSButton extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = '';
        this[_b] = false;
        this[_c] = false;
        this[_d] = false;
        this[_e] = false;
        this[_f] = '';
        this.handleClick = (e) => {
            this.dispatchEvent(new CustomEvent('ss-button-clicked', {
                bubbles: true,
                composed: true,
            }));
        };
    }
    static { _a = SSButtonProp.TEXT, _b = SSButtonProp.DISABLED, _c = SSButtonProp.LOADING, _d = SSButtonProp.POSITIVE, _e = SSButtonProp.NEGATIVE, _f = SSButtonProp.CLASS; }
    static { this.styles = [
        theme,
        css `
      button {
        border-radius: 0.5rem;

        &.loading {
          min-width: 100px;
        }

        &.positive {
          background-color: var(--positive-background-color);
          color: var(--positive-color);
          border-color: var(--positive-color);
        }

        &.negative {
          background-color: var(--negative-background-color);
          color: var(--negative-color);
          border-color: var(--negative-color);
        }

        &.disabled {
          opacity: 0.5;
        }
      }
    `,
    ]; }
    get classes() {
        const classes = {
            loading: this.loading,
            disabled: this.disabled,
            positive: this.positive,
            negative: this.negative,
        };
        this.class.split(' ').forEach(className => {
            classes[className] = true;
        });
        return classes;
    }
    render() {
        return html `
      <button
        class=${classMap(this.classes)}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        part="button"
      >
        ${this.loading
            ? html ` <ss-loader></ss-loader> `
            : this.text
                ? this.text
                : html `<slot></slot>`}
      </button>
    `;
    }
};
__decorate([
    property()
], SSButton.prototype, _a, void 0);
__decorate([
    property({ type: Boolean })
], SSButton.prototype, _b, void 0);
__decorate([
    property({ type: Boolean })
], SSButton.prototype, _c, void 0);
__decorate([
    property({ type: Boolean })
], SSButton.prototype, _d, void 0);
__decorate([
    property({ type: Boolean })
], SSButton.prototype, _e, void 0);
__decorate([
    property()
], SSButton.prototype, _f, void 0);
__decorate([
    state()
], SSButton.prototype, "classes", null);
SSButton = __decorate([
    customElement('ss-button')
], SSButton);
export { SSButton };
//# sourceMappingURL=ss-button.js.map