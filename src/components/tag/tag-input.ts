import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
  private minInput = 1;

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

  @property({ type: String, reflect: true }) value: string = '';
  @state() lastHitValue: string = '';
  @state() lastValueTags: string[] = [];

  get showButton(): boolean {
    return this.value.length > 0;
  }

  private _handleSubmitted() {
    this._save();
  }

  private async _handleChanged(e: CustomEvent) {
    console.log('_handleChanged', e.detail.value);
    this.value = e.detail.value;

    this.dispatchEvent(
      new CustomEvent('changed', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    );

    if (
      this.lastHitValue.length &&
      this.value.match(new RegExp(`^${this.lastHitValue}`))
      //&& this.lastValueTags.length === 0
    ) {
      console.log('bail out with no suggestions');
      this.state.setAutoSuggestions([]);
      return;
    }

    let tags: string[] = [];

    if (this.value.length >= this.minInput) {
      const json = await api.get<{ tags: string[] }>(`tag/${this.value}`);
      if (json) {
        tags = json.tags;
      }
    }

    if (tags.length) {
      this.lastHitValue = this.value;
    }

    this.lastValueTags = tags;

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
      }),
    );
  }

  render() {
    return html`
      <div class="tag-input">
        <div class="debug">
          <div>last hit value: ${this.lastHitValue}</div>
          <div>last value tags: ${this.lastValueTags.length}</div>
        </div>
        <ss-input
          @input-submitted=${this._handleSubmitted}
          @input-changed=${this._handleChanged}
          placeholder="Tag"
          value=${this.value}
          autoComplete
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
