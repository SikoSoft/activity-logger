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
      }
      button {
        padding: 0.5em 1em;
        cursor: pointer;
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  ];

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
          <ss-button text="&#x21e6;" @click=${this._prevPage}></ss-button>
        </div>
        <div class="center">${this.page}</div>
        <div class="right">
          <ss-button text="&#x21e8;" @click=${this._nextPage}></ss-button>
        </div>
      </div>
    `;
  }
}
