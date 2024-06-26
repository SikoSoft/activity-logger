import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@/components/ss-loader';

import { theme } from '@/styles/theme';

@customElement('ss-button')
export class SSButton extends LitElement {
  static styles = [
    theme,
    css`
      button.disabled {
        opacity: 0.5;
      }
    `,
  ];

  @property() text: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;

  @state()
  get classes() {
    return { disabled: this.disabled };
  }

  private _handleClick = (e: CustomEvent): void => {
    this.dispatchEvent(
      new CustomEvent('ss-button-clicked', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
    return html`
      <button
        class=${classMap(this.classes)}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
      >
        ${this.loading ? html` <ss-loader></ss-loader> ` : this.text}
      </button>
    `;
  }
}
