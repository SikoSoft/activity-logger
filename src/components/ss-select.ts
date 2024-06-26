import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { SelectChangedEvent } from '@/lib/Event';

import '@/components/ss-debug';

import { theme } from '@/styles/theme';

export interface SelectOption {
  value: string;
  label: string;
}

@customElement('ss-select')
export class SSSelect extends LitElement {
  static styles = [theme];

  @property({ type: Array }) options: SelectOption[] = [];
  @property() selected: string = '';
  @query('select') selectNode!: HTMLSelectElement;

  get value(): string {
    return this.selectNode.value;
  }

  private _handleSelectChanged() {
    this.dispatchEvent(
      new SelectChangedEvent({ value: this.selectNode.value }),
    );
  }

  render() {
    return html`
      <ss-debug>${JSON.stringify(this.options)}</ss-debug>
      <select @change=${this._handleSelectChanged}>
        ${repeat(
          this.options,
          option => option.value,
          option => html`
            <option
              value=${option.value}
              ?selected=${this.selected === option.value}
            >
              ${option.label}
            </option>
          `,
        )}
      </select>
    `;
  }
}
