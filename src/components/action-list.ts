import { css, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ActionItem } from '../models/Action';

import './action-list-item';
import '@/components/filter/list-filter';
import './ss-collapsable';
import '@/components/list-sort';
import { config } from '../models/Config';
import { theme } from '../styles/theme';
import { api } from '../lib/Api';
import { translate } from '../util/strings';
import { MobxLitElement } from '@adobe/lit-mobx';
import { appState } from '../state';
import { SortUpdatedEvent } from '@/events/sort-updated';
import { ListSortDirection, ListSortProperty } from 'api-spec/models/List';

@customElement('action-list')
export class ActionList extends MobxLitElement {
  public state = appState;

  static styles = [
    theme,
    css`
      .filter-body {
        padding-top: 1rem;
      }

      .list-items {
        margin-top: 1rem;
      }

      .no-actions {
        padding: 1rem;
      }
    `,
  ];
  private scrollHandler: EventListener = () => this._handleScroll();
  @query('#lazy-loader') lazyLoader!: HTMLDivElement;
  @state() items: ActionItem[] = [];
  @state() start: number = 0;
  @state() reachedEnd: boolean = false;
  @state() loading: boolean = false;
  @state() filterIsOpen: boolean = false;

  get totalShown(): number {
    return this.start + config.perPage;
  }

  get sortIsDefault(): boolean {
    return (
      this.state.listSort.direction === ListSortDirection.DESC &&
      this.state.listSort.property === ListSortProperty.OCCURRED_AT
    );
  }

  get lazyLoaderIsVisible(): boolean {
    var rect = this.lazyLoader.getBoundingClientRect();
    const docHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom <= docHeight;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._load();

    window.addEventListener('scroll', this.scrollHandler);

    this.addEventListener('action-item-deleted', e => {
      const event = e as CustomEvent;
      this.items = this.items.filter(item => item.id !== event.detail);
    });

    this.addEventListener('action-item-updated', e => {
      const event = e as CustomEvent;
      this.items = this.items.map(item =>
        item.id === event.detail.id
          ? {
              ...item,
              desc: event.detail.desc,
              occurredAt: event.detail.occurredAt,
              tags: event.detail.tags,
            }
          : item,
      );
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private _handleScroll() {
    if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
      this._load(true);
    }
  }

  private async _load(more: boolean = false): Promise<void> {
    this.loading = true;
    if (more) {
      this.start += config.perPage;
    }

    const queryParams = {
      ...(this.start > 0 ? { start: `${this.start}` } : {}),
      ...(!this.state.listFilter.includeAll
        ? { filter: JSON.stringify(this.state.listFilter) }
        : {}),
      ...(!this.sortIsDefault
        ? { sort: JSON.stringify(this.state.listSort) }
        : {}),
    };

    const url = `action${
      Object.keys(queryParams).length
        ? `?${new URLSearchParams(queryParams)}`
        : ''
    }`;
    try {
      const json = await api.get<{ actions: ActionItem[]; total: number }>(url);
      if (json) {
        if (json.actions) {
          this.items = more
            ? [...this.items, ...json.actions]
            : [...json.actions];
        }
        if (json.total) {
          this.reachedEnd = json.total <= this.totalShown ? true : false;
        }
      }
    } catch (error) {
      console.error(`Failed to get list: ${JSON.stringify(error)}`);
    } finally {
      this.loading = false;
    }
  }

  private _handleFilterUpdated(e: CustomEvent) {
    this.filterIsOpen = false;
    this._load();
  }

  private _handleSortUpdated(e: SortUpdatedEvent) {
    this._load();
  }

  private _toggleFilter() {
    this.filterIsOpen = !this.filterIsOpen;
  }

  render() {
    return html`
      <ss-collapsable
        title=${translate('filter')}
        ?open=${this.filterIsOpen}
        @toggled=${this._toggleFilter}
      >
        <div class="filter-body">
          <list-filter
            @filter-updated=${(e: CustomEvent) => {
              this._handleFilterUpdated(e);
            }}
          ></list-filter>
        </div>
      </ss-collapsable>

      <list-sort @sort-updated=${this._handleSortUpdated}></list-sort>

      <div class="box list-items">
        ${this.items.length
          ? repeat(
              this.items,
              item => item.id,
              item => html`
                <action-list-item
                  actionId=${item.id}
                  type=${item.type}
                  desc=${item.desc}
                  occurredAt=${item.occurredAt}
                  .tags=${item.tags}
                ></action-list-item>
              `,
            )
          : !this.loading
            ? html` <div class="no-actions">
                ${translate('noActionsFound')}
              </div>`
            : html` <ss-loader padded></ss-loader> `}
        <div id="lazy-loader"></div>
      </div>
    `;
  }
}
