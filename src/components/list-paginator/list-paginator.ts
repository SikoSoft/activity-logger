import { theme } from '@/styles/theme';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  ListPaginatorProp,
  listPaginatorProps,
  ListPaginatorProps,
} from './list-paginator.models';

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

  render() {
    return html`
      <div class="paginator box">
        <div class="left"><ss-button text="&#x21e6;"></ss-button></div>
        <div class="center">
          start: ${this.start} | total: ${this.total} | perPage: ${this.perPage}
        </div>
        <div class="right"><ss-button text="&#x21e8;"></ss-button></div>
      </div>
    `;
  }
}
