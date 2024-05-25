import { LitElement, html, PropertyValueMap, nothing, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { theme } from '../styles/theme';
import { repeat } from 'lit/directives/repeat.js';
import { SelectChangedEvent } from '@/lib/Event';

export interface SelectOption {
  value: string;
  label: string;
}

@customElement('ss-select')
export class SSSelect extends LitElement {
  static styles = [theme];

  @property({ type: Array }) options: SelectOption[] = [];
  @query('select') selectNode!: HTMLSelectElement;

  private _handleSelectChanged() {
    this.dispatchEvent(
      new SelectChangedEvent({ value: this.selectNode.value }),
    );
  }

  render() {
    return html`
      <select @change=${this._handleSelectChanged}>
        ${repeat(
          this.options,
          option => option.value,
          option => html`
            <option value=${option.value}>${option.label}</option>
          `,
        )}
      </select>
    `;
  }
}
