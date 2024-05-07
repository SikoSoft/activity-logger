import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './tag-input';
import './tag-list';
import { config } from '../../models/Config';
import { theme } from '../../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-manager')
export class TagManager extends LitElement {
  render() {
    return html`
      <div class="tag-manager">
        Tag manager
        <tag-input></tag-input>
        <tag-list></tag-list>
      </div>
    `;
  }
}
