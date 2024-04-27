import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { theme } from '../styles/theme';

@customElement('action-confirm-modal')
export class ActionConfirmModal extends LitElement {
  static styles = [
    theme,
    css`
      .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.3);
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
      }

      .buttons {
        padding: 1rem;
      }
    `,
  ];

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
      <div class="overlay"></div>
      <div class="box modal">
        Are you sure?
        <div class="buttons">
          <action-button
            @click=${this._sendCancelEvent}
            text="Cancel"
          ></action-button>
          <action-button
            @click=${this._sendConfirmEvent}
            text="Confirm"
          ></action-button>
        </div>
      </div>
    `;
  }
}
