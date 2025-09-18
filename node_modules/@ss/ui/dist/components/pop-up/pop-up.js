var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { theme } from '../../styles/theme';
import { PopUpProp, popUpProps } from './pop-up.models';
import { classMap } from 'lit/directives/class-map.js';
import { PopUpClosedEvent } from './pop-up.events';
let PopUp = class PopUp extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = popUpProps[PopUpProp.OPEN].default;
        this[_b] = popUpProps[PopUpProp.CLOSE_BUTTON].default;
        this[_c] = popUpProps[PopUpProp.CLOSE_ON_OUTSIDE_CLICK].default;
        this[_d] = popUpProps[PopUpProp.CLOSE_ON_ESC].default;
        this.newlyOpened = false;
        this.handleClickOutside = (e) => {
            if (!this.newlyOpened &&
                this[PopUpProp.CLOSE_ON_OUTSIDE_CLICK] &&
                this[PopUpProp.OPEN] &&
                !e.composedPath().includes(this.container)) {
                this.dispatchEvent(new PopUpClosedEvent({}));
            }
        };
        this.handleKeyDown = (e) => {
            if (this[PopUpProp.CLOSE_ON_ESC] && e.key === 'Escape') {
                this.dispatchEvent(new PopUpClosedEvent({}));
            }
        };
    }
    static { _a = PopUpProp.OPEN, _b = PopUpProp.CLOSE_BUTTON, _c = PopUpProp.CLOSE_ON_OUTSIDE_CLICK, _d = PopUpProp.CLOSE_ON_ESC; }
    static { this.styles = [
        theme,
        css `
      :host {
        display: block;
      }

      .pop-up {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .inner {
          padding: 3rem;
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          .close-button {
            position: absolute;
            top: 0rem;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    `,
    ]; }
    get classes() {
        return {
            'pop-up': true,
            open: this.open,
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleClickOutside);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleClickOutside);
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has(PopUpProp.OPEN)) {
            if (this[PopUpProp.OPEN]) {
                this.newlyOpened = true;
                setTimeout(() => {
                    this.newlyOpened = false;
                }, 100);
            }
            else {
                this.newlyOpened = false;
            }
        }
    }
    render() {
        return html `
      <div class=${classMap(this.classes)} part="container">
        <div class="inner">
          ${this[PopUpProp.CLOSE_BUTTON]
            ? html `
                <div
                  class="close-button"
                  @click=${() => {
                this.dispatchEvent(new PopUpClosedEvent({}));
            }}
                >
                  &#215;
                </div>
              `
            : nothing}
          <slot></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], PopUp.prototype, _a, void 0);
__decorate([
    property({ type: Boolean })
], PopUp.prototype, _b, void 0);
__decorate([
    property({ type: Boolean })
], PopUp.prototype, _c, void 0);
__decorate([
    property({ type: Boolean })
], PopUp.prototype, _d, void 0);
__decorate([
    state()
], PopUp.prototype, "newlyOpened", void 0);
__decorate([
    query('.pop-up')
], PopUp.prototype, "container", void 0);
__decorate([
    state()
], PopUp.prototype, "classes", null);
PopUp = __decorate([
    customElement('pop-up')
], PopUp);
export { PopUp };
//# sourceMappingURL=pop-up.js.map