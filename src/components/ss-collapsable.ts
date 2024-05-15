import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
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
        display: none;
      }

      .collapsable.open .body {
        display: initial;
        padding: 1rem;
      }
    `,
  ];

  @property() title: string = '';
  @state() isOpen: boolean = false;

  get classes(): string {
    const classes = ['box', 'collapsable'];
    if (this.isOpen) {
      classes.push('open');
    }
    return classes.join(' ');
  }

  private _handleIconClick() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div class=${this.classes}>
        <div class="head">
          <div class="title">${this.title}</div>
          <div class="icon">
            <button @click=${() => this._handleIconClick()}>
              ${this.isOpen ? '-' : '+'}
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
