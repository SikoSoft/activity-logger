import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { theme } from '../styles/theme';

import './action-input-auto';

@customElement('action-input')
export class ActionInput extends LitElement {
  static styles = [
    theme,
    css`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  @property() value: string = '';
  @property({ type: Boolean }) autoComplete: boolean = true;
  @state() _value: string = this.value;
  @query('#input-field') inputField!: HTMLInputElement;
  @query('action-input-auto') autoCompleteNode!: HTMLElement;

  @state() hasFocus: boolean = false;
  @state()
  get showAutoComplete(): boolean {
    return this.autoComplete && this.hasFocus && this._value.length > 0;
  }

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.inputField.value = this.value;
    }
  }

  private _handleChange = (e: Event): boolean => {
    let value = '';
    if (e.target instanceof HTMLInputElement) {
      value = e.target.value;
    }
    this._value = value;
    this.dispatchEvent(
      new CustomEvent('action-input-changed', {
        bubbles: true,
        composed: true,
        detail: {
          value,
        },
      })
    );
    if (e.target instanceof HTMLInputElement) {
      e.target.value = this._value;
    }
    e.preventDefault();
    return false;
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
        this._sendSuggestionUpEvent();
        e.preventDefault();
        return;
      case 'ArrowDown':
        this._sendSuggestionDownEvent();
        e.preventDefault();
        return;
      case 'Enter':
        this._sendSuggestionSelectEvent();
        e.preventDefault();
        return;
    }
  };

  private _sendSuggestionUpEvent() {
    this.autoCompleteNode.dispatchEvent(new CustomEvent('select-up'));
  }

  private _sendSuggestionDownEvent() {
    this.autoCompleteNode.dispatchEvent(new CustomEvent('select-down'));
  }

  private _sendSuggestionSelectEvent() {
    this.autoCompleteNode.dispatchEvent(new CustomEvent('select'));
  }
  private _handleInput = (e: Event): boolean => {
    let value = '';
    if (e.target instanceof HTMLInputElement) {
      value = e.target.value;
    }
    this._value = value;
    return true;
  };

  private _handleFocus = (e: Event): void => {
    this.hasFocus = true;
  };

  private _handleBlur = (e: Event): void => {
    setTimeout(() => {
      this.hasFocus = false;
    }, 200);
  };

  private _suggestionSelectHandler = (e: CustomEvent): void => {
    this.inputField.value = e.detail;
    this.inputField.blur();
  };

  render() {
    return html`
      <span>
        <input
          id="input-field"
          type="text"
          value=${this.value}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          autocomplete="off"
        />
        ${this.showAutoComplete
          ? html`
              <action-input-auto
                input=${this._value}
                @suggestion-selected=${this._suggestionSelectHandler}
              ></action-input-auto>
            `
          : nothing}
      </span>
    `;
  }
}
