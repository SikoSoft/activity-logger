import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InputType } from '../../models/Input';
import { SSInputProp, SSInputProps, ssInputProps } from './ss-input.models';

import { InputChangedEvent, InputSubmittedEvent } from './ss-input.events';
import { SuggestionChangedEvent } from '../ss-input-auto/ss-input-auto.events';

import '../ss-input-auto/ss-input-auto';

import { theme } from '../../styles/theme';

@customElement('ss-input')
export class SSInput extends LitElement {
  private clickFocusHandler: (event: MouseEvent) => void = (
    event: MouseEvent,
  ) => {};

  static styles = [
    theme,
    css`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  @property()
  [SSInputProp.TYPE]: SSInputProps[SSInputProp.TYPE] =
    ssInputProps[SSInputProp.TYPE].default;

  @property()
  [SSInputProp.VALUE]: SSInputProps[SSInputProp.VALUE] =
    ssInputProps[SSInputProp.VALUE].default;

  @property({ type: Boolean })
  [SSInputProp.AUTO_COMPLETE]: SSInputProps[SSInputProp.AUTO_COMPLETE] =
    ssInputProps[SSInputProp.AUTO_COMPLETE].default;

  @property()
  [SSInputProp.PLACEHOLDER]: SSInputProps[SSInputProp.PLACEHOLDER] =
    ssInputProps[SSInputProp.PLACEHOLDER].default;

  @property({ type: Array })
  [SSInputProp.SUGGESTIONS]: SSInputProps[SSInputProp.SUGGESTIONS] =
    ssInputProps[SSInputProp.SUGGESTIONS].default;

  @property({ type: Number, reflect: true })
  [SSInputProp.MIN]?: SSInputProps[SSInputProp.MIN];

  @property({ type: Number, reflect: true })
  [SSInputProp.MAX]?: SSInputProps[SSInputProp.MAX];

  @property({ type: Number, reflect: true })
  [SSInputProp.STEP]?: SSInputProps[SSInputProp.STEP];

  @state() _value: string = this.value;
  @query('input') inputField!: HTMLInputElement;
  @query('ss-input-auto') autoCompleteNode: HTMLElement | undefined;
  @query('span') container!: HTMLSpanElement;

  @state() hasFocus: boolean = false;
  @state() autoDismissed: boolean = false;
  @state()
  get showAutoComplete(): boolean {
    return this.autoComplete && !this.autoDismissed && this.value.length > 0;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.clickFocusHandler = (event: MouseEvent) => {
      const withinBoundaries = event.composedPath().includes(this.container);
      if (!withinBoundaries) {
        this.autoDismissed = true;
      }

      if (this.type === InputType.NUMBER) {
        this.min = ssInputProps[SSInputProp.MIN].default;
        this.max = ssInputProps[SSInputProp.MAX].default;
        this.step = ssInputProps[SSInputProp.STEP].default;
      }
    };

    window.addEventListener('mousedown', this.clickFocusHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('mousedown', this.clickFocusHandler);
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

  private handleChange = (e: Event): boolean => {
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

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    switch (e.code) {
      case 'Tab':
        this.autoDismissed = true;
        return;
      case 'ArrowUp':
        this.sendSuggestionUpEvent(e);
        return;
      case 'ArrowDown':
        this.sendSuggestionDownEvent(e);
        return;
      case 'Enter':
        if (this.showAutoComplete) {
          this.sendSuggestionSelectEvent();
        } else {
          this.sendSubmittedEvent();
        }
        e.preventDefault();
        return;
    }
  };

  private sendSuggestionUpEvent(e: KeyboardEvent) {
    if (!this.autoCompleteNode) {
      return;
    }

    this.autoCompleteNode.dispatchEvent(new CustomEvent('select-up'));
    e.preventDefault();
  }

  private sendSuggestionDownEvent(e: KeyboardEvent) {
    if (!this.autoCompleteNode) {
      return;
    }

    this.autoCompleteNode.dispatchEvent(new CustomEvent('select-down'));
    e.preventDefault();
  }

  private sendSuggestionSelectEvent() {
    if (!this.autoCompleteNode) {
      return;
    }

    this.autoCompleteNode.dispatchEvent(new CustomEvent('select'));
  }

  private sendSubmittedEvent() {
    this.inputField.dispatchEvent(
      new InputSubmittedEvent({ value: this._value }),
    );
  }

  private handleSubmit() {
    this.sendSubmittedEvent();
  }

  private handleInput = (e: Event): boolean => {
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

  private handleFocus = (e: Event): void => {
    this.hasFocus = true;
    this.autoDismissed = false;
  };

  private handleBlur = (e: Event): void => {
    setTimeout(() => {
      this.hasFocus = false;
    }, 200);
  };

  private suggestionSelectHandler = (e: SuggestionChangedEvent): void => {
    this.autoDismissed = true;
    this.inputField.value = e.detail.value;
    this.inputField.dispatchEvent(
      new InputChangedEvent({ value: e.detail.value }),
    );
  };

  render() {
    return html`
      <span part="container">
        <input
          part="input"
          type=${this.type}
          value=${this.value}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          autocomplete="off"
          autocapitalize="off"
        />
        ${this.showAutoComplete
          ? html`
              <ss-input-auto
                input=${this._value}
                .suggestions=${this.suggestions}
                @suggestion-submitted=${this.handleSubmit}
                @suggestion-changed=${this.suggestionSelectHandler}
              ></ss-input-auto>
            `
          : nothing}
      </span>
    `;
  }
}
