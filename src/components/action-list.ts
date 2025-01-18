import { css, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

import {
  ListContextType,
  ListSortDirection,
  ListSortProperty,
} from 'api-spec/models/List';

import { ActionItem } from '@/models/Action';
import { config } from '@/models/Config';
import { theme } from '@/styles/theme';
import { api } from '@/lib/Api';
import { appState } from '@/state';

import { SortUpdatedEvent } from '@/events/sort-updated';
import { PointerLongPressEvent } from '@/events/pointer-long-press';
import { PointerUpEvent } from '@/events/pointer-up';
import { ViewElement } from '@/lib/ViewElement';

import '@ss/ui/components/ss-loader';
import '@ss/ui/components/ss-collapsable';
import { ActionListItem, ActionListItemMode } from './action-list-item';
import '@/components/action-list-item';
import '@/components/filter/list-filter';
import '@/components/list-sort';
import '@/components/list-context';
import { ListFilter } from '@/components/filter/list-filter';
import { ListContextUpdatedEvent } from '@/events/list-context-updated';

@customElement('action-list')
export class ActionList extends ViewElement {
  public state = appState;

  static styles = [
    theme,
    css`
      ss-collapsable {
        display: block;
        margin-top: 1rem;
      }

      .list-items {
        margin-top: 1rem;
        overflow: hidden;
      }

      .no-actions {
        padding: 1rem;
      }
    `,
  ];
  private scrollHandler: EventListener = () => this._handleScroll();
  @query('#lazy-loader') lazyLoader!: HTMLDivElement;
  @query('list-filter') listFilter!: ListFilter;

  @state() start: number = 0;
  @state() reachedEnd: boolean = false;
  @state() loading: boolean = false;
  @state() filterIsOpen: boolean = false;
  @state() sortIsOpen: boolean = false;
  @state() contextIsOpen: boolean = false;
  @state() actionContextIsOpen: Map<number, boolean> = new Map<
    number,
    boolean
  >();

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
    console.log('connectedCallback');
    super.connectedCallback();
    this.load();

    window.addEventListener('scroll', this.scrollHandler);

    this.addEventListener('action-item-deleted', e => {
      const event = e as CustomEvent;
      this.state.setListItems(
        this.state.listItems.filter(item => item.id !== event.detail),
      );
    });

    this.addEventListener('action-item-updated', e => {
      const event = e as CustomEvent;
      this.state.setListItems(
        this.state.listItems.map(item =>
          item.id === event.detail.id
            ? {
                ...item,
                desc: event.detail.desc,
                occurredAt: event.detail.occurredAt,
                tags: event.detail.tags,
              }
            : item,
        ),
      );
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  sync() {
    this.listFilter.sync();
    this.load();
  }

  private _handleScroll() {
    if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
      this.load(true);
    }
  }

  async load(more: boolean = false): Promise<void> {
    console.log('load', more);
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
      ...(this.state.listContextMode
        ? { context: JSON.stringify(this.state.listContext) }
        : {}),
    };

    const url = `action${
      Object.keys(queryParams).length
        ? `?${new URLSearchParams(queryParams)}`
        : ''
    }`;
    try {
      const result = await api.get<{
        actions: ActionItem[];
        total: number;
        context: Record<number, ActionItem[]>;
      }>(url);
      if (result) {
        if (result.response.actions) {
          this.state.setListItems(
            more
              ? [...this.state.listItems, ...result.response.actions]
              : [...result.response.actions],
          );
        }
        if (result.response.context) {
          this.state.setContextListItems({
            ...this.state.contextListItems,
            ...result.response.context,
          });
          this.actionContextIsOpen = new Map<number, boolean>();
          Object.keys(result.response.context).forEach(key => {
            this.actionContextIsOpen.set(parseInt(key), false);
          });
        }
        if (result.response.total) {
          this.reachedEnd =
            result.response.total <= this.totalShown ? true : false;
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
    this.load();
  }

  private _handleSortUpdated(e: SortUpdatedEvent) {
    this.load();
  }

  private _handleContextUpdated(e: ListContextUpdatedEvent) {
    this.load();
  }

  private _toggleFilter() {
    this.filterIsOpen = !this.filterIsOpen;
  }

  private _toggleSort() {
    this.sortIsOpen = !this.sortIsOpen;
  }

  private _toggleContext() {
    this.contextIsOpen = !this.contextIsOpen;
  }

  private _toggleActionContext(id: number) {
    const state = this.actionContextIsOpen.get(id);
    if (state) {
      this.actionContextIsOpen.set(id, false);
    } else {
      this.actionContextIsOpen.set(id, true);
    }
    this.requestUpdate();
  }

  private _handlePointerLongPress(e: PointerLongPressEvent) {
    const listItem = e.target as ActionListItem;
    this.state.toggleActionSelection(listItem.actionId);
  }

  private _handlePointerUp(e: PointerUpEvent) {
    const listItem = e.target as ActionListItem;
    if (!this.state.selectMode) {
      listItem.setMode(ActionListItemMode.EDIT);
      return;
    }
    this.state.toggleActionSelection(listItem.actionId);
  }

  private renderContextActions(type: ListContextType, item: ActionItem) {
    return this.state.listContext.type === type &&
      this.state.contextListItems[item.id]?.length
      ? html`
          <ss-collapsable
            title=${msg('Show context')}
            @toggled=${() => {
              this._toggleActionContext(item.id);
            }}
            ?open=${this.actionContextIsOpen.get(item.id)}
          >
            ${this.state.contextListItems[item.id].map(
              contextAction => html`
                <action-list-item
                  actionId=${contextAction.id}
                  type=${contextAction.type}
                  desc=${contextAction.desc}
                  occurredAt=${contextAction.occurredAt}
                  .tags=${contextAction.tags}
                  ?selected=${this.state.selectedActions.includes(
                    contextAction.id,
                  )}
                  @pointer-long-press=${this._handlePointerLongPress}
                  @pointer-up=${this._handlePointerUp}
                ></action-list-item>
              `,
            )}
          </ss-collapsable>
        `
      : nothing;
  }

  render() {
    return html`
      <ss-collapsable
        title=${msg('Filter')}
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

      <ss-collapsable
        title=${msg('Sort')}
        ?open=${this.sortIsOpen}
        @toggled=${this._toggleSort}
      >
        <list-sort @sort-updated=${this._handleSortUpdated}></list-sort>
      </ss-collapsable>

      ${!this.state.listFilter.includeAll
        ? html`
            <ss-collapsable
              title=${msg('Context')}
              ?open=${this.contextIsOpen}
              @toggled=${this._toggleContext}
            >
              <list-context
                @list-context-updated=${this._handleContextUpdated}
              ></list-context>
            </ss-collapsable>
          `
        : nothing}

      <div class="box list-items">
        ${this.state.listItems.length
          ? repeat(
              this.state.listItems,
              item => item.id,
              item => html`
                ${this.renderContextActions(ListContextType.AFTER, item)}
                <action-list-item
                  actionId=${item.id}
                  type=${item.type}
                  desc=${item.desc}
                  occurredAt=${item.occurredAt}
                  .tags=${item.tags}
                  ?selected=${this.state.selectedActions.includes(item.id)}
                  @pointer-long-press=${this._handlePointerLongPress}
                  @pointer-up=${this._handlePointerUp}
                ></action-list-item>
                ${this.renderContextActions(ListContextType.BEFORE, item)}
              `,
            )
          : !this.loading
            ? html` <div class="no-actions">${msg('No actions found')}</div>`
            : html` <ss-loader padded></ss-loader> `}
        <div id="lazy-loader"></div>
      </div>
    `;
  }
}
