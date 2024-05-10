import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { theme } from '../styles/theme';

@customElement('ss-button')
export class SSButton extends LitElement {
  static styles = [theme];

  @property() text: string = '';

  private _handleClick = (e: CustomEvent): void => {
    this.dispatchEvent(
      new CustomEvent('ss-button-clicked', {
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    return html` <button @click=${this._handleClick}>${this.text}</button> `;
  }
}
