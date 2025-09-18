import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { theme } from '../../styles/theme';
import {
  ConfirmationModalProp,
  ConfirmationModalProps,
  confirmationModalProps,
} from './confirmation-modal.models';
import { classMap } from 'lit/directives/class-map.js';
import {
  ConfirmationAcceptedEvent,
  ConfirmationDeclinedEvent,
} from './confirmation-modal.events';

import '../pop-up/pop-up';
import '../ss-button/ss-button';

@customElement('confirmation-modal')
export class ConfirmationModal extends LitElement {
  static styles = [
    theme,
    css`
      :host {
        display: block;
      }

      .confirmation-modal {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .message {
          padding: 1rem;
        }

        .buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          padding: 0.5rem;
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  [ConfirmationModalProp.OPEN]: ConfirmationModalProps[ConfirmationModalProp.OPEN] =
    confirmationModalProps[ConfirmationModalProp.OPEN].default;

  @property()
  [ConfirmationModalProp.MESSAGE]: ConfirmationModalProps[ConfirmationModalProp.MESSAGE] =
    confirmationModalProps[ConfirmationModalProp.MESSAGE].default;

  @property()
  [ConfirmationModalProp.ACCEPT_TEXT]: ConfirmationModalProps[ConfirmationModalProp.ACCEPT_TEXT] =
    confirmationModalProps[ConfirmationModalProp.ACCEPT_TEXT].default;

  @property()
  [ConfirmationModalProp.DECLINE_TEXT]: ConfirmationModalProps[ConfirmationModalProp.DECLINE_TEXT] =
    confirmationModalProps[ConfirmationModalProp.DECLINE_TEXT].default;

  @state()
  newlyOpened = false;

  @state()
  get classes() {
    return {
      'confirmation-modal': true,
      open: this.open,
    };
  }

  accept() {
    this.dispatchEvent(new ConfirmationAcceptedEvent({}));
    this.close();
  }

  decline() {
    this.dispatchEvent(new ConfirmationDeclinedEvent({}));
    this.close();
  }

  close() {
    this.open = false;
  }

  render() {
    return html`
      <div class=${classMap(this.classes)} part="container">
        <pop-up
          ?open=${this.open}
          closeButton
          closeOnOutsideClick
          closeOnEsc
          @pop-up-closed=${this.decline}
        >
          <div class="message" part="message">${this.message}</div>
          <div class="buttons" part="buttons">
            <ss-button positive @click=${this.accept} part="accept-button"
              >${this.acceptText}</ss-button
            >
            <ss-button negative @click=${this.decline} part="decline-button"
              >${this.declineText}</ss-button
            >
          </div>
        </pop-up>
      </div>
    `;
  }
}
