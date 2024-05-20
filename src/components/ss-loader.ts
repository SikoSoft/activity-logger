import { LitElement, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

@customElement('ss-loader')
export class SSLoader extends LitElement {
  static styles = css`
    .container {
      height: auto;
    }

    .loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #000;
      box-shadow: 32px 0 #000, -32px 0 #000;
      position: relative;
      animation: flash 0.5s ease-out infinite alternate;
      transform: skewX(50%);
    }

    @keyframes flash {
      0% {
        background-color: #0002;
        box-shadow: 32px 0 #0002, -32px 0 #000;
      }
      50% {
        background-color: #000;
        box-shadow: 32px 0 #0002, -32px 0 #0002;
      }
      100% {
        background-color: #0002;
        box-shadow: 32px 0 #000, -32px 0 #0002;
      }
    }
  `;

  render() {
    return html`<div class="container">
      <span class="loader"></span>
    </div>`;
  }
}
