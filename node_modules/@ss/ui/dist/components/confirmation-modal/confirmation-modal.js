var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { theme } from '../../styles/theme';
import { ConfirmationModalProp, confirmationModalProps, } from './confirmation-modal.models';
import { classMap } from 'lit/directives/class-map.js';
import { ConfirmationAcceptedEvent, ConfirmationDeclinedEvent, } from './confirmation-modal.events';
import '../pop-up/pop-up';
import '../ss-button/ss-button';
let ConfirmationModal = class ConfirmationModal extends LitElement {
    constructor() {
        super(...arguments);
        this[_a] = confirmationModalProps[ConfirmationModalProp.OPEN].default;
        this[_b] = confirmationModalProps[ConfirmationModalProp.MESSAGE].default;
        this[_c] = confirmationModalProps[ConfirmationModalProp.ACCEPT_TEXT].default;
        this[_d] = confirmationModalProps[ConfirmationModalProp.DECLINE_TEXT].default;
        this.newlyOpened = false;
    }
    static { _a = ConfirmationModalProp.OPEN, _b = ConfirmationModalProp.MESSAGE, _c = ConfirmationModalProp.ACCEPT_TEXT, _d = ConfirmationModalProp.DECLINE_TEXT; }
    static { this.styles = [
        theme,
        css `
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
    ]; }
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
        return html `
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
};
__decorate([
    property({ type: Boolean, reflect: true })
], ConfirmationModal.prototype, _a, void 0);
__decorate([
    property()
], ConfirmationModal.prototype, _b, void 0);
__decorate([
    property()
], ConfirmationModal.prototype, _c, void 0);
__decorate([
    property()
], ConfirmationModal.prototype, _d, void 0);
__decorate([
    state()
], ConfirmationModal.prototype, "newlyOpened", void 0);
__decorate([
    state()
], ConfirmationModal.prototype, "classes", null);
ConfirmationModal = __decorate([
    customElement('confirmation-modal')
], ConfirmationModal);
export { ConfirmationModal };
//# sourceMappingURL=confirmation-modal.js.map