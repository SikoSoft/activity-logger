var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ToggleChangedEvent } from './ss-toggle.events';
import { SSToggleProp, ssToggleProps } from './ss-toggle.models';
let SSToggle = class SSToggle extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = ssToggleProps[SSToggleProp.ON].default;
        this[_b] = ssToggleProps[SSToggleProp.HIGHLIGHT_TIME].default;
        this.highlight = false;
    }
    static { _a = SSToggleProp.ON, _b = SSToggleProp.HIGHLIGHT_TIME; }
    static { this.styles = css `
    .toggle {
      display: inline-block;
      height: 3rem;
      width: 6rem;
      border-radius: 1.5rem;
      background: linear-gradient(#777, #999);
      position: relative;
      transition: all 0.1s;
      cursor: pointer;

      &:hover {
        scale: 1.05;
      }

      &.highlight {
        animation: highlight var(--highlight-time) ease-in-out;
      }
    }

    .toggle::before {
      content: '';
      position: absolute;
      height: 2.4rem;
      width: 5.4rem;
      top: 0.3rem;
      left: 0.3rem;

      background: linear-gradient(#ccc, #aaa);
      border-radius: 1.2rem;
    }

    .toggle.on {
      .ball {
        opacity: 1;
      }
    }

    .toggle.on .ball {
      left: 3.5rem;
    }

    .ball {
      opacity: 0.35;
      position: absolute;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      left: 0.5rem;
      top: 0.5rem;
      background: linear-gradient(45deg, #555, #777);
      border-radius: 1rem;
      border: 2px #222 solid;
      box-sizing: border-box;
      transition: all 0.3s;
    }

    @keyframes highlight {
      0% {
        box-shadow: 0 0 0px rgba(0, 0, 0, 0);
      }
      50% {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      100% {
        box-shadow: 0 0 0px rgba(0, 0, 0, 0);
      }
    }
  `; }
    get classes() {
        return { toggle: true, on: this.on, highlight: this.highlight };
    }
    handleClick() {
        this.highlight = true;
        const on = !this.on;
        this.on = on;
        this.dispatchEvent(new ToggleChangedEvent({ on }));
        setTimeout(() => {
            this.highlight = false;
        }, this.highlightTime);
    }
    render() {
        return html `
      <span
        part="container"
        class=${classMap(this.classes)}
        @click=${this.handleClick}
        style="--highlight-time: ${this.highlightTime}ms"
      >
        <span part="indicator" class="ball"></span>
      </span>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], SSToggle.prototype, _a, void 0);
__decorate([
    property({ type: Number, reflect: true })
], SSToggle.prototype, _b, void 0);
__decorate([
    state()
], SSToggle.prototype, "highlight", void 0);
__decorate([
    state()
], SSToggle.prototype, "classes", null);
SSToggle = __decorate([
    customElement('ss-toggle')
], SSToggle);
export { SSToggle };
//# sourceMappingURL=ss-toggle.js.map