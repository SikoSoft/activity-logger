import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { config } from '../models/Config';

import './action-input';
import './action-button';
import './action-confirm-modal';
import './tag/tag-manager';
import { theme } from '../styles/theme';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';
import { translate } from '../util/strings';
import { InputType } from '../models/Input';
import { formatDate } from '../util/time';

@customElement('action-form')
export class ActionForm extends MobxLitElement {
  private state = appState;
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
  @property({ reflect: true }) desc: string = '';
  @property({ reflect: true }) occurredAt: string = '';

  //@state() desc: string = this.desc;
  @state() initialDesc: string = '';
  @state() initialOccurredAt: string = '';
  @state() confirmModalShown: boolean = false;
  @state() advancedMode: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.desc = this.desc.trim();
    this.occurredAt = formatDate(new Date(this.occurredAt));
    this.initialDesc = this.desc;
    this.initialOccurredAt = this.occurredAt;
  }

  get apiUrl(): string {
    return this.actionId
      ? `${config.apiUrl}action/${this.actionId}`
      : `${config.apiUrl}action`;
  }

  @state()
  get hasChanged(): boolean {
    return (
      this.desc.trim() !== this.initialDesc ||
      this.occurredAt !== this.initialOccurredAt
    );
  }

  private async _saveAction() {
    const desc = this.desc.trim();

    try {
      if (desc && this.hasChanged) {
        const occurredAt = this.occurredAt;
        const timeZone = new Date().getTimezoneOffset();
        console.log({ occurredAt, timeZone });
        await fetch(this.apiUrl, {
          method: 'POST',
          body: JSON.stringify({ type: 'food', desc, occurredAt, timeZone }),
        });
        this.desc = '';

        this.dispatchEvent(
          new CustomEvent('action-item-updated', {
            bubbles: true,
            composed: true,
            detail: { id: this.actionId, desc, occurredAt },
          })
        );

        this.state.addToast('Added!');
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

      this.state.addToast('Removed!');
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

    this.desc = '';
  }

  private _handleDescChanged(e: CustomEvent) {
    //console.log('_handleChange', e);
    this.desc = e.detail.value;
  }

  private _handleDescSubmitted(e: CustomEvent) {
    //this.action = e.detail;
    this._saveAction();
  }

  private _handleOccurredAtChanged(e: CustomEvent) {
    //console.log('_handleChange', e);
    this.occurredAt = e.detail.value;
  }

  private _handleOccurredAtSubmitted(e: CustomEvent) {
    //this.action = e.detail;
    this._saveAction();
  }

  private _handleSaveClick(e: CustomEvent) {
    this._saveAction();
  }

  private _handleDeleteClick(e: CustomEvent) {
    this.confirmModalShown = true;
  }

  render() {
    return html`
      <form class="box">
        <div>
          <action-input
            @action-input-submitted=${this._handleDescSubmitted}
            @action-input-changed=${this._handleDescChanged}
            value=${this.desc}
          ></action-input>
        </div>
        ${this.actionId
          ? html`
              <div>
                <action-input
                  type=${InputType.DATETIME_LOCAL}
                  @action-input-submitted=${this._handleOccurredAtSubmitted}
                  @action-input-changed=${this._handleOccurredAtChanged}
                  value=${this.occurredAt}
                ></action-input>
              </div>
            `
          : nothing}
        <div>
          <action-button
            @click=${this._handleSaveClick}
            text=${this.actionId
              ? this.hasChanged
                ? translate('update')
                : translate('cancel')
              : translate('add')}
          ></action-button>
          ${this.actionId
            ? html`
                <action-button
                  @click=${this._handleDeleteClick}
                  text=${translate('delete')}
                ></action-button>
                <action-confirm-modal
                  @confirm=${this._deleteAction}
                  @cancel=${() => (this.confirmModalShown = false)}
                  ?open=${this.confirmModalShown}
                ></action-confirm-modal>
                <tag-manager></tag-manager>
              `
            : nothing}
        </div>
      </form>
    `;
  }
}
