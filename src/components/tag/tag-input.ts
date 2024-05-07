import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './tag-input';
import './tag-list';
import { config } from '../../models/Config';
import { theme } from '../../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-input')
export class TagInput extends LitElement {
  render() {
    return html` <div class="tag-input"></div> `;
  }
}
