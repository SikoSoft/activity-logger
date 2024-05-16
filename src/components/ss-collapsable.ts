import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from '../styles/theme';

import './ss-input-auto';

@customElement('ss-collapsable')
export class SSCollapsable extends LitElement {
  static styles = [
    theme,
    css`
      .collapsable {
        padding: 1rem;
      }

      .head {
        display: flex;
      }

      .title {
        flex-grow: 9;
      }

      .icon {
        flex-grow: 1;
        text-align: right;
      }

      .icon button {
        width: auto;
        padding: 0 0.5rem;
      }

      .body {
        max-height: 0;
        transition: all 0.3s;
        overflow: hidden;
      }

      .collapsable.open .body {
        max-height: 600px;
      }
    `,
  ];

  @property() title: string = '';
  @property({ type: Boolean }) open: boolean = false;

  @state()
  get classes() {
    return { box: true, collapsable: true, open: this.open };
  }

  private _handleIconClick() {
    this._toggle();
  }

  private _toggle() {
    this.dispatchEvent(
      new CustomEvent('toggled', {
        bubbles: true,
        composed: true,
        detail: this.open,
      })
    );
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="head">
          <div class="title">${this.title}</div>
          <div class="icon">
            <button @click=${() => this._handleIconClick()}>
              ${this.open ? '-' : '+'}
            </button>
          </div>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
