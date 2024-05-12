import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import './tag-input';
import './tag-list';
import { config } from '../../models/Config';
import { theme } from '../../styles/theme';

const apiUrl = `${config.apiUrl}action`;

@customElement('tag-manager')
export class TagManager extends LitElement {
  static styles = [
    theme,
    css`
      .tag-manager {
        border-radius: 0.25rem;
        border: 1px #ccc solid;
      }

      .no-tags {
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.75rem;
      }
    `,
  ];

  @property({ type: Array, reflect: true }) tags: string[] = [];

  private _handleAdded(e: CustomEvent) {
    this.tags = [...this.tags, e.detail.value];
    this._sendUpdatedEvent();
  }

  private _handleDeleted(e: CustomEvent) {
    this.tags = this.tags.filter(tag => tag !== e.detail.value);
    this._sendUpdatedEvent();
  }

  private _sendUpdatedEvent() {
    this.dispatchEvent(
      new CustomEvent('updated', {
        composed: true,
        bubbles: true,
        detail: { tags: this.tags },
      })
    );
  }

  render() {
    return html`
      <fieldset class="tag-manager">
        <legend>Tags</legend>
        <tag-input
          @added=${(e: CustomEvent) => {
            this._handleAdded(e);
          }}
        ></tag-input>
        ${this.tags.length
          ? html` <tag-list
              .tags=${this.tags}
              @deleted=${(e: CustomEvent) => {
                this._handleDeleted(e);
              }}
            ></tag-list>`
          : html`<div class="no-tags">No tags are set</div>`}
      </fieldset>
    `;
  }
}
