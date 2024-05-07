import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { config } from '../../models/Config';
import { theme } from '../../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-item')
export class TagItem extends LitElement {
  render() {
    return html` <li class="tag-item"></li> `;
  }
}
