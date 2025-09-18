var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c;
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './svg/svg-profile';
import './svg/svg-arrow-circle-left';
import './svg/svg-arrow-circle-right';
import './svg/svg-valid-circle';
import './svg/svg-invalid-circle';
import './svg/svg-gear';
import './svg/svg-delete';
import { theme } from '../../styles/theme';
import { IconName, SSIconProp, ssIconProps, } from './ss-icon.models';
let SSIcon = class SSIcon extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = ssIconProps[SSIconProp.NAME].default;
        this[_b] = ssIconProps[SSIconProp.COLOR].default;
        this[_c] = ssIconProps[SSIconProp.SIZE].default;
    }
    static { _a = SSIconProp.NAME, _b = SSIconProp.COLOR, _c = SSIconProp.SIZE; }
    static { this.styles = [
        theme,
        css `
      :host {
        display: inline-block;
        vertical-align: middle;
        width: var(--size, 24px);
        height: var(--size, 24px);
      }

      .icon {
        display: inline-block;
        width: var(--size, 24px);
        height: var(--size, 24px);

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: var(--color, #000);
        }
      }
    `,
    ]; }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has(SSIconProp.SIZE)) {
            this.style.setProperty('--size', `${this[SSIconProp.SIZE]}px`);
        }
    }
    renderIcon() {
        switch (this[SSIconProp.NAME]) {
            case IconName.PROFILE:
                return html `<svg-profile></svg-profile>`;
            case IconName.ARROW_CIRCLE_LEFT:
                return html `<svg-arrow-circle-left></svg-arrow-circle-left>`;
            case IconName.ARROW_CIRCLE_RIGHT:
                return html `<svg-arrow-circle-right></svg-arrow-circle-right>`;
            case IconName.VALID_CIRCLE:
                return html `<svg-valid-circle></svg-valid-circle>`;
            case IconName.INVALID_CIRCLE:
                return html `<svg-invalid-circle></svg-invalid-circle>`;
            case IconName.GEAR:
                return html `<svg-gear></svg-gear>`;
            case IconName.DELETE:
                return html `<svg-delete></svg-delete>`;
            default:
                return nothing;
        }
    }
    render() {
        return html `
      <span
        class="icon"
        style="--color: ${this[SSIconProp.COLOR]}; --size: ${this[SSIconProp.SIZE]}px;"
      >
        ${this.renderIcon()}
      </span>
    `;
    }
};
__decorate([
    property()
], SSIcon.prototype, _a, void 0);
__decorate([
    property()
], SSIcon.prototype, _b, void 0);
__decorate([
    property({ type: Number })
], SSIcon.prototype, _c, void 0);
SSIcon = __decorate([
    customElement('ss-icon')
], SSIcon);
export { SSIcon };
//# sourceMappingURL=ss-icon.js.map