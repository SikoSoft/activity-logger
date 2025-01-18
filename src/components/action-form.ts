import { html, css, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';

import { appState } from '@/state';
import { InputType } from '@/models/Input';
import { Time } from '@/lib/Time';
import { api } from '@/lib/Api';

import { ViewElement } from '@/lib/ViewElement';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import './action-confirm-modal';
import './tag/tag-manager';

import { theme } from '@/styles/theme';

export interface PostRequestBody {
  type: string;
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
}

@customElement('action-form')
export class ActionForm extends ViewElement {
  private state = appState;

  static styles = [
    theme,
    css`
      form {
        padding: 1rem;
      }

      tag-manager,
      .time {
        display: none;
      }

      form.advanced-mode tag-manager,
      form.advanced-mode .time {
        display: initial;
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

  @state() initialDesc: string = '';
  @state() initialOccurredAt: string = '';
  @state() initialTags: string = '';
  @state() confirmModalShown: boolean = false;
  @state() advancedMode: boolean = false;
  @state() loading: boolean = false;
  @state() lastInputHadResults: boolean = true;
  @state() lastInput: string = '';

  @state()
  get classes() {
    return { box: true, 'advanced-mode': this.state.advancedMode };
  }

  @state()
  get tagsAndSuggestions(): string[] {
    return [...this.tags, ...this.state.tagSuggestions];
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.desc = this.desc.trim();
    this.occurredAt = Time.formatDateTime(new Date(this.occurredAt));
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
    this.loading = true;
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
          }),
        );

        this.state.addToast(this.actionId ? msg('Updated!') : msg('Added!'));

        this.loading = false;
        return;
      }

      this.dispatchEvent(
        new CustomEvent('action-item-canceled', {
          bubbles: true,
          composed: true,
          detail: { id: this.actionId },
        }),
      );
    } catch (error) {
      console.error(`Error encountered in when saving action: ${error}`);
    }

    this.loading = false;
  }

  private reset(): void {
    this.desc = '';
    this.tagValue = '';
    if (!this.actionId) {
      this.tags = [];
    }
    this.state.setTagSuggestions([]);
  }

  private async _deleteAction() {
    this.loading = true;

    try {
      await api.delete(this.apiUrl);

      this.state.addToast(msg('Removed!'));
    } catch (error) {
      console.error(`Error encountered when deleting action: ${error}`);
    }

    this.dispatchEvent(
      new CustomEvent('action-item-deleted', {
        bubbles: true,
        composed: true,
        detail: this.actionId,
      }),
    );

    this.desc = '';
    this.loading = false;
  }

  private async _requestActionSuggestions(): Promise<void> {
    if (!this.lastInputHadResults && this.desc.startsWith(this.lastInput)) {
      this.state.setActionSuggestions([]);
      return;
    }

    try {
      this.lastInputHadResults = false;
      const result = await api.get<{ suggestions: string[] }>(
        `actionSuggestion/${this.desc}`,
      );

      let suggestions: string[] = [];
      if (result) {
        suggestions = result.response.suggestions;
      }

      if (suggestions.length) {
        this.lastInputHadResults = true;
      }
      this.state.setActionSuggestions(suggestions);
    } catch (error) {
      console.error(
        `Failed to get action suggestions: ${JSON.stringify(error)}`,
      );
    }

    this.lastInput = this.desc;
  }

  private async _requestTagSuggestions(): Promise<void> {
    if (this.desc.length === 0) {
      this.state.setTagSuggestions([]);
      return;
    }

    try {
      const result = await api.get<{ suggestions: string[] }>(
        `tagSuggestion/${this.desc}`,
      );

      let suggestions: string[] = [];
      if (result) {
        suggestions = result.response.suggestions;
      }

      this.state.setTagSuggestions(
        suggestions.filter(suggestion => !this.tags.includes(suggestion)),
      );
    } catch (error) {
      console.error(`Failed to get tag suggestions: ${JSON.stringify(error)}`);
    }
  }

  private async _handleDescChanged(e: CustomEvent) {
    this.desc = e.detail.value;
    this._requestTagSuggestions();
    this._requestActionSuggestions();
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
    this.state.setTagSuggestions(
      this.state.tagSuggestions.filter(suggestion =>
        this.tags.includes(suggestion),
      ),
    );
  }

  render() {
    return html`
      <form class=${classMap(this.classes)}>
        <div>
          <ss-input
            @input-submitted=${this._handleDescSubmitted}
            @input-changed=${this._handleDescChanged}
            value=${this.desc}
            .suggestions=${this.state.actionSuggestions}
            autoComplete
          ></ss-input>
        </div>
        <tag-manager
          value=${this.tagValue}
          .tags=${this.tagsAndSuggestions}
          @tags-updated=${(e: CustomEvent) => {
            this._handleTagsUpdated(e);
          }}
        ></tag-manager>
        ${this.actionId
          ? html`
              <div class="time">
                <ss-input
                  type=${InputType.DATETIME_LOCAL}
                  @input-submitted=${this._handleOccurredAtSubmitted}
                  @input-changed=${this._handleOccurredAtChanged}
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
                ? msg('Update')
                : msg('Cancel')
              : msg('Add')}
            ?loading=${this.loading}
          ></ss-button>
          ${this.actionId
            ? html`
                <ss-button
                  @click=${this._handleDeleteClick}
                  text=${msg('Delete')}
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
