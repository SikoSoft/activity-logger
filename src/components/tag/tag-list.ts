import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { config } from '../../models/Config';
import { theme } from '../../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-list')
export class TagList extends LitElement {
  render() {
    return html` <ul class="tag-list"></ul> `;
  }
}
