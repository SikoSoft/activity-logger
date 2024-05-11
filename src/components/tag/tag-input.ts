import { LitElement, css, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import '../ss-input';
import '../ss-button';
import './tag-input';
import './tag-list';

import { theme } from '../../styles/theme';
import { api } from '../../lib/Api';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../../state';

@customElement('tag-input')
export class TagInput extends MobxLitElement {
  private state = appState;

  static styles = [
    theme,
    css`
      .tag-input {
        display: flex;
      }

      ss-input {
        flex-grow: 7;
      }

      ss-button {
        flex-grow: 3;
      }
    `,
  ];

  @state() value: string = '';

  get showButton(): boolean {
    return this.value.length > 0;
  }

  private _handleSubmitted() {
    this._save();
  }

  private async _handleChanged(e: CustomEvent) {
    this.value = e.detail.value;

    const json = await api.get<{ tags: string[] }>(`tag/${this.value}`);
    if (json) {
      this.state.setAutoSuggestions(json.tags);
    }
  }

  private _handleSaveClick(e: CustomEvent) {
    this._save();
  }

  private _save() {
    console.log('save', this.value);

    this._sendAddedEvent();
  }

  private _sendAddedEvent() {
    this.dispatchEvent(
      new CustomEvent('added', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  render() {
    return html`
      <div class="tag-input">
        <ss-input
          @action-input-submitted=${this._handleSubmitted}
          @action-input-changed=${this._handleChanged}
          placeholder="Tag"
        ></ss-input>
        ${this.showButton
          ? html`
              <ss-button text="Add" @click=${this._handleSaveClick}></ss-button>
            `
          : nothing}
      </div>
    `;
  }
}
