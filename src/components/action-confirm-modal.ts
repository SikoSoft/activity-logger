import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from '../styles/theme';

import './ss-button';
import { translate } from '../util/strings';

@customElement('action-confirm-modal')
export class ActionConfirmModal extends LitElement {
  static styles = [
    theme,
    css`
      .container.open .overlay {
        opacity: 1;
        pointer-events: initial;
      }

      .container.open .modal {
        transform: initial;
        opacity: 1;
      }

      .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0;
        pointer-events: none;
      }

      .modal {
        position: fixed;
        z-index: 2;
        width: 80%;
        height: 40%;
        max-height: 320px;
        max-width: 480px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 1rem;
        transform: translateY(200%);
        transition: 0.3s;
        opacity: 0;
      }

      .buttons {
        padding: 1rem;
      }

      .buttons ss-button {
        margin-top: 1rem;
        display: block;
      }
    `,
  ];

  @property({ type: Boolean }) open: boolean = false;

  @state() get classes() {
    return { container: true, open: this.open };
  }

  private _sendConfirmEvent() {
    this.dispatchEvent(
      new CustomEvent('confirm', { bubbles: true, composed: true })
    );
  }

  private _sendCancelEvent() {
    this.dispatchEvent(
      new CustomEvent('cancel', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="overlay"></div>
        <div class="box modal">
          ${translate('areYouSure')}
          <div class="buttons">
            <ss-button
              @click=${this._sendConfirmEvent}
              text=${translate('yes')}
            ></ss-button>
            <ss-button
              @click=${this._sendCancelEvent}
              text=${translate('cancel')}
            ></ss-button>
          </div>
        </div>
      </div>
    `;
  }
}
