import { LitElement, html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { config } from '../models/Config';

import './ss-input';
import './ss-button';
import './action-confirm-modal';
import './tag/tag-manager';
import { theme } from '../styles/theme';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';
import { translate } from '../util/strings';
import { InputType } from '../models/Input';
import { formatDate } from '../util/time';
import { api } from '../lib/Api';

export interface PostRequestBody {
  type: string;
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
}

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
  @property({ reflect: true, type: Array }) tags: string[] = [];
  @property({ reflect: true }) tagValue: string = '';

  //@state() desc: string = this.desc;
  @state() initialDesc: string = '';
  @state() initialOccurredAt: string = '';
  @state() initialTags: string = '';
  @state() confirmModalShown: boolean = false;
  @state() advancedMode: boolean = false;
  //@state() tags: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    this.desc = this.desc.trim();
    this.occurredAt = formatDate(new Date(this.occurredAt));
    this.initialDesc = this.desc;
    this.initialOccurredAt = this.occurredAt;
    this.initialTags = JSON.stringify(this.tags);
  }

  get apiUrl(): string {
    return this.actionId ? `action/${this.actionId}` : `action`;
  }

  @state()
  get hasChanged(): boolean {
    return (
      this.desc.trim() !== this.initialDesc ||
      this.occurredAt !== this.initialOccurredAt ||
      JSON.stringify(this.tags) !== this.initialTags
    );
  }

  private async _saveAction() {
    const desc = this.desc.trim();

    try {
      if (desc && this.hasChanged) {
        const occurredAt = this.occurredAt;
        const timeZone = new Date().getTimezoneOffset();

        await api.post<PostRequestBody, null>(this.apiUrl, {
          type: 'food',
          desc,
          occurredAt,
          timeZone,
          tags: this.tags,
        });

        this.reset();

        this.dispatchEvent(
          new CustomEvent('action-item-updated', {
            bubbles: true,
            composed: true,
            detail: { id: this.actionId, desc, occurredAt, tags: this.tags },
          })
        );

        this.state.addToast(
          this.actionId ? translate('updated') : translate('added')
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

  private reset(): void {
    this.desc = '';
    this.tagValue = '';
    if (!this.actionId) {
      this.tags = [];
    }
  }

  private async _deleteAction() {
    try {
      await api.delete(this.apiUrl);

      this.state.addToast(translate('removed'));
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

  private async _handleDescChanged(e: CustomEvent) {
    this.desc = e.detail.value;

    console.log('handleDescChanged');
    try {
      const json = await api.get<{ suggestions: string[] }>('actionSuggestion');
      if (json) {
        this.state.setAutoSuggestions(json.suggestions);
      }
    } catch (error) {
      console.error(`Failed to get suggestions: ${JSON.stringify(error)}`);
    }
  }

  private _handleDescSubmitted(e: CustomEvent) {
    this._saveAction();
  }

  private _handleOccurredAtChanged(e: CustomEvent) {
    this.occurredAt = e.detail.value;
  }

  private _handleOccurredAtSubmitted(e: CustomEvent) {
    this._saveAction();
  }

  private _handleSaveClick(e: CustomEvent) {
    this._saveAction();
  }

  private _handleDeleteClick(e: CustomEvent) {
    this.confirmModalShown = true;
  }

  private _handleTagsUpdated(e: CustomEvent) {
    this.tags = e.detail.tags;
  }

  render() {
    return html`
      <form class="box">
        <div>
          <ss-input
            @action-input-submitted=${this._handleDescSubmitted}
            @action-input-changed=${this._handleDescChanged}
            value=${this.desc}
            autoComplete
          ></ss-input>
        </div>
        <tag-manager
          value=${this.tagValue}
          .tags=${this.tags}
          @updated=${(e: CustomEvent) => {
            this._handleTagsUpdated(e);
          }}
        ></tag-manager>
        ${this.actionId
          ? html`
              <div>
                <ss-input
                  type=${InputType.DATETIME_LOCAL}
                  @action-input-submitted=${this._handleOccurredAtSubmitted}
                  @action-input-changed=${this._handleOccurredAtChanged}
                  value=${this.occurredAt}
                ></ss-input>
              </div>
            `
          : nothing}
        <div>
          <ss-button
            @click=${this._handleSaveClick}
            text=${this.actionId
              ? this.hasChanged
                ? translate('update')
                : translate('cancel')
              : translate('add')}
          ></ss-button>
          ${this.actionId
            ? html`
                <ss-button
                  @click=${this._handleDeleteClick}
                  text=${translate('delete')}
                ></ss-button>
                <action-confirm-modal
                  @confirm=${this._deleteAction}
                  @cancel=${() => (this.confirmModalShown = false)}
                  ?open=${this.confirmModalShown}
                ></action-confirm-modal>
              `
            : nothing}
        </div>
      </form>
    `;
  }
}
