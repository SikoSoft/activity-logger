import { theme } from '@/styles/theme';
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  ListPaginatorProp,
  listPaginatorProps,
  ListPaginatorProps,
} from './list-paginator.models';

import { PageChangedEvent } from './list-paginator.events';

import '@ss/ui/components/ss-button';

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

  @state() maxPagesToShow = 0;

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
    if (this.pages === 1) {
      return [1];
    }

    const pages = [];

    if (this.pages <= this.maxPagesToShow) {
      for (let i = 1; i <= this.pages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, this.page - 2);
      const endPage = Math.min(this.pages - 1, this.page + 2);

      if (startPage > 2) {
        pages.push(0);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.pages - 1) {
        pages.push(0);
      }

      pages.push(this.pages);
    }

    return pages;
  }

  private prevPage(): void {
    if (this.page > 1) {
      const start = this.start - this.perPage;
      this.dispatchEvent(
        new PageChangedEvent({ start: start < 0 ? 0 : start }),
      );
    }
  }

  private nextPage(): void {
    if (this.page + 1 <= this.pages) {
      this.dispatchEvent(
        new PageChangedEvent({ start: this.start + this.perPage }),
      );
    }
  }

  private goToPage(page: number): void {
    this.dispatchEvent(
      new PageChangedEvent({ start: (page - 1) * this.perPage }),
    );
  }

  render(): TemplateResult | typeof nothing {
    return this.pages > 1
      ? html`
          <div class="paginator box">
            <div class="left">
              <button text="" @click=${this.prevPage}>&#x21e6;</button>
            </div>

            <div class="center">
              <div class="pages">
                ${this.quickPages.map(page =>
                  page === 0
                    ? html`<span>...</span>`
                    : html`<button
                        class=${classMap({
                          'quick-page': true,
                          active: page === this.page,
                        })}
                        @click=${() => this.goToPage(page)}
                      >
                        ${page}
                      </button>`,
                )}
              </div>
            </div>

            <div class="right">
              <button text="" @click=${this.nextPage}>&#x21e8;</button>
            </div>
          </div>
        `
      : nothing;
  }
}
