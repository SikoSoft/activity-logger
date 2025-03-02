import { theme } from '@/styles/theme';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ListPaginatorProp,
  listPaginatorProps,
  ListPaginatorProps,
} from './list-paginator.models';

import '@ss/ui/components/ss-button';
import { PageChangedEvent } from './list-paginator.events';
import { classMap } from 'lit/directives/class-map.js';

@customElement('list-paginator')
export class ListPaginator extends LitElement {
  @property({ type: Number })
  [ListPaginatorProp.START]: ListPaginatorProps[ListPaginatorProp.START] =
    listPaginatorProps[ListPaginatorProp.START].default;

  @property({ type: Number })
  [ListPaginatorProp.TOTAL]: ListPaginatorProps[ListPaginatorProp.TOTAL] =
    listPaginatorProps[ListPaginatorProp.TOTAL].default;

  @property({ type: Number })
  [ListPaginatorProp.PER_PAGE]: ListPaginatorProps[ListPaginatorProp.PER_PAGE] =
    listPaginatorProps[ListPaginatorProp.PER_PAGE].default;

  @state()
  get pages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  @state()
  get page(): number {
    return Math.ceil(this.start / this.perPage) + 1;
  }

  static styles = [
    theme,
    css`
      :host {
        display: block;
      }
      .paginator {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem;
      }

      .pages {
        display: flex;
        gap: 0.25rem;
      }

      .quick-page {
        color: #777;

        &.active {
          color: #000;
          font-weight: bold;
        }
      }

      button {
        cursor: pointer;
        border-radius: 8px;
        border: 1px #aaa solid;
        transition: all 0.2s;

        &:hover {
          background-color: #ccc;
        }
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  ];

  @state()
  get quickPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.pages; i++) {
      pages.push(i);
    }
    return pages;
  }

  private _prevPage() {
    if (this.page > 1) {
      const start = this.start - this.perPage;
      this.dispatchEvent(
        new PageChangedEvent({ start: start < 0 ? 0 : start }),
      );
    }
  }

  private _nextPage() {
    if (this.page + 1 <= this.pages) {
      this.dispatchEvent(
        new PageChangedEvent({ start: this.start + this.perPage }),
      );
    }
  }

  render() {
    return html`
      <div class="paginator box">
        <div class="left">
          <button text="" @click=${this._prevPage}>&#x21e6;</button>
        </div>
        <div class="center">
          <div class="pages">
            ${this.quickPages.map(
              page =>
                html`<button
                  class=${classMap({
                    'quick-page': true,
                    active: page === this.page,
                  })}
                  @click=${() =>
                    this.dispatchEvent(
                      new PageChangedEvent({
                        start: (page - 1) * this.perPage,
                      }),
                    )}
                >
                  ${page}
                </button>`,
            )}
          </div>
        </div>

        <div class="right">
          <button text="" @click=${this._nextPage}>&#x21e8;</button>
        </div>
      </div>
    `;
  }
}
