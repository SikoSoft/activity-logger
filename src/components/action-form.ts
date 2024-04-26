import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { config } from '../models/Config';

import './action-input';
import './action-button';
import { theme } from '../styles/theme';

@customElement('action-form')
export class ActionForm extends LitElement {
  static styles = [
    theme,
    css`
      form {
        padding: 1rem;
      }

      div:last-child {
        margin-top: 1rem;
      }
    `,
  ];
  @property({ type: Number }) actionId: number = 0;
  @property() type: string = '';
  @property() desc: string = '';
  @property({ type: Number }) time: number = 0;
  @state() action: string = this.desc;
  @state() initialDesc: string = '';

  connectedCallback(): void {
    super.connectedCallback();

    this.action = this.desc.trim();
    this.initialDesc = this.action;
  }

  get apiUrl(): string {
    return this.actionId
      ? `${config.apiUrl}action/${this.actionId}`
      : `${config.apiUrl}action`;
  }

  @state()
  get hasChanged(): boolean {
    return this.action.trim() !== this.initialDesc;
  }

  private async _saveAction() {
    const desc = this.action.trim();

    try {
      if (desc && this.hasChanged) {
        await fetch(this.apiUrl, {
          method: 'POST',
          body: JSON.stringify({ type: 'food', desc }),
        });
        this.action = '';

        this.dispatchEvent(
          new CustomEvent('action-item-updated', {
            bubbles: true,
            composed: true,
            detail: { id: this.actionId, desc },
          })
        );
        return;
      }

      this.dispatchEvent(
        new CustomEvent('action-item-canceled', {
          bubbles: true,
          composed: true,
          detail: { id: this.actionId },
        })
      );
    } catch (error) {
      console.error(`Error encountered in when saving action: ${error}`);
    }
  }

  private async _deleteAction() {
    try {
      await fetch(this.apiUrl, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error encountered when deleting action: ${error}`);
    }

    this.dispatchEvent(
      new CustomEvent('action-item-deleted', {
        bubbles: true,
        composed: true,
        detail: this.actionId,
      })
    );

    this.action = '';
  }

  private _handleChange(e: CustomEvent) {
    console.log('_handleChange', e);
    this.action = e.detail.value;
  }

  private _handleSubmitted(e: CustomEvent) {
    //this.action = e.detail;
    this._saveAction();
  }

  private _handleSaveClick(e: CustomEvent) {
    this._saveAction();
  }

  private _handleDeleteClick(e: CustomEvent) {
    this._deleteAction();
  }

  render() {
    return html`
      <form class="box">
        <div>
          <action-input
            @action-input-submitted=${this._handleSubmitted}
            @action-input-changed=${this._handleChange}
            value=${this.action}
          ></action-input>
        </div>
        <div>
          <action-button
            @click=${this._handleSaveClick}
            text=${this.actionId
              ? this.hasChanged
                ? 'Update'
                : 'Cancel'
              : 'Add'}
          ></action-button>
          ${this.actionId
            ? html`
                <action-button
                  @click=${this._handleDeleteClick}
                  text="Delete"
                ></action-button>
              `
            : nothing}
        </div>
      </form>
    `;
  }
}
