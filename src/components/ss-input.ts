import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';

import { InputType } from '@/models/Input';

import { InputSubmittedEvent } from '@/events/input-submitted';
import { InputChangedEvent } from '@/events/input-changed';

import '@/components/ss-input-auto';

import { theme } from '@/styles/theme';

@customElement('ss-input')
export class SSInput extends LitElement {
  static styles = [
    theme,
    css`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  @property() type: InputType = InputType.TEXT;
  @property() value: string = '';
  @property({ type: Boolean }) autoComplete: boolean = false;
  @property() placeholder: string = '';
  @state() _value: string = this.value;
  @query('#input-field') inputField!: HTMLInputElement;
  @query('ss-input-auto') autoCompleteNode!: HTMLElement;

  @state() hasFocus: boolean = false;
  @state() autoDismissed: boolean = false;
  @state()
  get showAutoComplete(): boolean {
    return this.autoComplete && !this.autoDismissed && this.value.length > 0;
  }

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.inputField.value = this.value;
    }
  }

  focus() {
    this.inputField.focus();
  }

  clear() {
    this.inputField.value = '';
    this.dispatchEvent(
      new InputChangedEvent({
        value: '',
      }),
    );
  }

  private _handleChange = (e: Event): boolean => {
    let value = '';
    if (e.target instanceof HTMLInputElement) {
      value = e.target.value;
    }
    this._value = value;
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
        if (this.showAutoComplete) {
          this._sendSuggestionSelectEvent();
        } else {
          this._sendSubmittedEvent();
        }
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

  private _sendSubmittedEvent() {
    this.inputField.dispatchEvent(
      new InputSubmittedEvent({ value: this._value }),
    );
  }

  private _handleSubmit() {
    this._sendSubmittedEvent();
  }

  private _handleInput = (e: Event): boolean => {
    let value = '';
    if (e.target instanceof HTMLInputElement) {
      value = e.target.value;
    }
    this.dispatchEvent(
      new InputChangedEvent({
        value,
      }),
    );
    this._value = value;
    this.autoDismissed = false;
    return true;
  };

  private _handleFocus = (e: Event): void => {
    this.hasFocus = true;
    this.autoDismissed = false;
  };

  private _handleBlur = (e: Event): void => {
    setTimeout(() => {
      this.hasFocus = false;
    }, 200);
  };

  private _suggestionSelectHandler = (e: CustomEvent): void => {
    this.autoDismissed = true;
    this.inputField.value = e.detail;
    this.inputField.dispatchEvent(new InputChangedEvent({ value: e.detail }));
  };

  render() {
    return html`
      <span>
        <input
          id="input-field"
          type=${this.type}
          value=${this.value}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          placeholder=${this.placeholder}
          autocomplete="off"
        />
        ${this.showAutoComplete
          ? html`
              <ss-input-auto
                input=${this._value}
                @submit=${this._handleSubmit}
                @suggestion-selected=${this._suggestionSelectHandler}
              ></ss-input-auto>
            `
          : nothing}
      </span>
    `;
  }
}
