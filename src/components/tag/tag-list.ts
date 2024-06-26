import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '@/components/ss-input';

import { theme } from '@/styles/theme';

@customElement('tag-list')
export class TagList extends LitElement {
  static styles = [
    theme,
    css`
      .tag-list {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        display: flex;
        flex-wrap: wrap;
      }

      .tag-list li {
        display: inline-block;
        padding: 0.25rem;
        border-radius: 0.125rem;
        border: 1px #ccc solid;
        background-color: #efefef;
        position: relative;
      }

      .tag-list li .delete {
        display: inline-block;
        background-color: var(--negative-color);
        border-radius: 0.25rem;
        border: 1px rgba(255, 255, 255, 0.5) outset;
        padding: 0.25rem;
        color: #fff;
        font-size: 1.5rem;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        cursor: pointer;
      }
    `,
  ];

  @property({ type: Array }) tags: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
  }

  private _deleteTag(tag: string) {
    this.dispatchEvent(
      new CustomEvent('deleted', {
        bubbles: true,
        composed: true,
        detail: { value: tag },
      }),
    );
  }

  render() {
    return html`
      <ul class="tag-list">
        ${repeat(
          this.tags,
          tag => tag,
          tag => html`
            <li>
              ${tag}
              <span
                class="delete"
                @click=${() => {
                  this._deleteTag(tag);
                }}
                >&#215;</span
              >
            </li>
          `,
        )}
      </ul>
    `;
  }
}
