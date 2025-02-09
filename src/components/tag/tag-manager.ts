import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TagsUpdatedEvent } from '@/events/tags-updated';

import '@/components/tag/tag-input';
import '@/components/tag/tag-list';

import { theme } from '@/styles/theme';
import { msg } from '@lit/localize';

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
  @property({ type: String, reflect: true }) value: string = '';

  private _handleAdded(e: CustomEvent) {
    this.tags = [...this.tags, e.detail.value];
    this._sendUpdatedEvent();
  }

  private _handleDeleted(e: CustomEvent) {
    this.tags = this.tags.filter(tag => tag !== e.detail.value);
    this._sendUpdatedEvent();
  }

  private _handleChanged(e: CustomEvent) {
    this.value = e.detail.value;
  }

  private _sendUpdatedEvent() {
    this.dispatchEvent(new TagsUpdatedEvent({ tags: this.tags }));
  }

  render() {
    return html`
      <fieldset class="tag-manager">
        <legend>${msg('Tags')}</legend>
        <tag-input
          value=${this.value}
          @changed=${(e: CustomEvent) => {
            this._handleChanged(e);
          }}
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
          : html`<div class="no-tags">${msg('No tags are set')}</div>`}
      </fieldset>
    `;
  }
}
