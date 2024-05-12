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
  @state() lastHitValue: string = '';
  @state() lastHitTags: string[] = [];

  get showButton(): boolean {
    return this.value.length > 0;
  }

  private _handleSubmitted() {
    this._save();
  }

  private async _handleChanged(e: CustomEvent) {
    this.value = e.detail.value;

    if (
      this.lastHitValue.length &&
      this.value.match(new RegExp(`^${this.lastHitValue}`)) &&
      this.lastHitTags.length === 0
    ) {
      //console.log('use empty tags, avoid http request');
      this.state.setAutoSuggestions([]);
      return;
    }

    let tags: string[] = [];

    const json = await api.get<{ tags: string[] }>(`tag/${this.value}`);
    if (json) {
      tags = json.tags;
    }

    if (tags.length) {
      this.lastHitValue = this.value;
    }

    this.lastHitTags = tags;

    this.state.setAutoSuggestions(tags);
  }

  private _handleSaveClick(e: CustomEvent) {
    this._save();
  }

  private _save() {
    this._sendAddedEvent();
    this.value = '';
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
          value=${this.value}
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
