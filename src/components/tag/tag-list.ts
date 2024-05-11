import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { config } from '../../models/Config';
import { theme } from '../../styles/theme';
import { repeat } from 'lit/directives/repeat.js';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-list')
export class TagList extends LitElement {
  @property({ type: Array }) tags: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    console.log('connectedCallback', this.tags);
  }

  render() {
    return html`
      <ul class="tag-list">
        ${repeat(
          this.tags,
          tag => tag,
          tag => html` <li>${tag}</li> `
        )}
      </ul>
    `;
  }
}
