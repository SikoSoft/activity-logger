var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { SSLoaderProp, ssLoaderProps } from './ss-loader.models';
let SSLoader = class SSLoader extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = ssLoaderProps[SSLoaderProp.PADDED].default;
    }
    static { _a = SSLoaderProp.PADDED; }
    static { this.styles = css `
    .container {
      text-align: center;
      height: 16px;
    }

    .container.padded {
      margin: 1rem;
    }

    .loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #000;
      box-shadow:
        32px 0 #000,
        -32px 0 #000;
      position: relative;
      animation: flash 0.5s ease-out infinite alternate;
      transform: skewX(50%);
    }

    @keyframes flash {
      0% {
        background-color: #0002;
        box-shadow:
          32px 0 #0002,
          -32px 0 #000;
      }
      50% {
        background-color: #000;
        box-shadow:
          32px 0 #0002,
          -32px 0 #0002;
      }
      100% {
        background-color: #0002;
        box-shadow:
          32px 0 #000,
          -32px 0 #0002;
      }
    }
  `; }
    get classes() {
        return { container: true, padded: this.padded };
    }
    render() {
        return html `<div class=${classMap(this.classes)}>
      <span class="loader"></span>
    </div>`;
    }
};
__decorate([
    property({ type: Boolean })
], SSLoader.prototype, _a, void 0);
__decorate([
    state()
], SSLoader.prototype, "classes", null);
SSLoader = __decorate([
    customElement('ss-loader')
], SSLoader);
export { SSLoader };
//# sourceMappingURL=ss-loader.js.map