import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { ToggleChangedEvent } from '@/events/toggle-changed';

@customElement('ss-toggle')
export class SSToggle extends LitElement {
  static styles = css`
    .toggle {
      display: inline-block;
      height: 3rem;
      width: 6rem;
      border-radius: 1.5rem;
      background: linear-gradient(#ccc, #aaa);
      position: relative;
      opacity: 0.7;
      transition: all 0.3s;
      cursor: pointer;
    }

    .toggle::before {
      content: '';
      position: absolute;
      height: 2.4rem;
      width: 5.4rem;
      top: 0.3rem;
      left: 0.3rem;
      background: linear-gradient(#333, #555);
      border-radius: 1.2rem;
      opacity: 0.4;
    }

    .toggle.on {
      opacity: 1;
    }

    .toggle.on .ball {
      left: 3.5rem;
    }

    .ball {
      position: absolute;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      left: 0.5rem;
      top: 0.5rem;
      background: linear-gradient(45deg, #333, #555);
      border-radius: 1rem;
      border: 1px #777 solid;
      box-sizing: border-box;
      transition: all 0.3s;
    }
  `;

  @property({ type: Boolean }) on: boolean = false;

  @state()
  get classes() {
    return { toggle: true, on: this.on };
  }

  private _handleClick() {
    this.dispatchEvent(new ToggleChangedEvent({ on: !this.on }));
  }

  render() {
    return html`
      <span class=${classMap(this.classes)} @click=${this._handleClick}>
        <span class="ball"></span>
      </span>
    `;
  }
}
