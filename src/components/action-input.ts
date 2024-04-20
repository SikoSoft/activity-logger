import { LitElement, html, css, PropertyValueMap } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { theme } from '../styles/theme';

@customElement('action-input')
export class ActionInput extends LitElement {
  static styles = [theme];
  @property() value: string = '';
  @state() _value: string = this.value;
  @query('#input-field') inputField!: HTMLInputElement;

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.inputField.value = this.value;
    }
  }

  private _handleChange = (e: Event): boolean => {
    console.log('_handleChange', e);
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

  private _handleKeyDown = (e: KeyboardEvent): boolean => {
    if (!(e.target instanceof HTMLInputElement)) {
      return false;
    }
    console.log('keyDown', e);
    if (e.code === 'Enter') {
      console.log('in here for keydown');
      const changeEvent = new CustomEvent('action-input-submitted', {
        bubbles: true,
        composed: true,
      });
      this.inputField.dispatchEvent(changeEvent);
    }
    //e.preventDefault();
    return true;
  };

  private _handleInput = (e: Event): boolean => {
    let value = '';
    if (e.target instanceof HTMLInputElement) {
      value = e.target.value;
    }
    this._value = value;
    return true;
  };

  render() {
    return html`
      <input
        id="input-field"
        type="text"
        value=${this.value}
        @change=${this._handleChange}
        @keydown=${this._handleKeyDown}
        @input=${this._handleInput}
      />
    `;
  }
}
