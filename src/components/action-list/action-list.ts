import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { translate } from '@/lib/Localization';

import {
  ListContextType,
  ListSortDirection,
  ListSortProperty,
} from 'api-spec/models/List';
import { PaginationType, SettingName } from 'api-spec/models/Setting';
import { ActionItem } from '@/models/Action';
import { api } from '@/lib/Api';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';

import { ListSortUpdatedEvent } from '@/components/list-sort/list-sort.events';
import { PointerLongPressEvent } from '@/events/pointer-long-press';
import { PointerUpEvent } from '@/events/pointer-up';
import { PageChangedEvent } from '@/components/list-paginator/list-paginator.events';
import {
  ActionItemDeletedEvent,
  ActionItemUpdatedEvent,
} from '@/components/action-form/action-form.events';
import { ListFilterUpdatedEvent } from '@/components/list-filter/list-filter.events';
import { ListContextUpdatedEvent } from '@/components/list-context/list-context.events';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-loader';
import '@ss/ui/components/ss-collapsable';
import '@/components/action-list/action-list-item/action-list-item';
import '@/components/list-filter/list-filter';
import '@/components/list-sort/list-sort';
import '@/components/list-context/list-context';
import '@/components/list-paginator/list-paginator';
import '@/components/setting/setting-form/setting-form';
import { ListFilter } from '@/components/list-filter/list-filter';
import {
  ActionListItem,
  ActionListItemMode,
} from './action-list-item/action-list-item';

import { theme } from '@/styles/theme';

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

      .more {
        margin-top: 1rem;
      }
    `,
  ];
  private scrollHandler: EventListener = () => this.handleScroll();
  @query('#lazy-loader') lazyLoader!: HTMLDivElement;
  @query('list-filter') listFilter!: ListFilter;

  @state() start: number = 0;
  @state() total: number = 0;
  @state() loading: boolean = false;
  @state() filterIsOpen: boolean = false;
  @state() settingIsOpen: boolean = false;
  @state() sortIsOpen: boolean = false;
  @state() contextIsOpen: boolean = false;
  @state() actionContextIsOpen: Map<number, boolean> = new Map<
    number,
    boolean
  >();

  @state()
  get perPage(): number {
    const perPage = this.state.listSetting[SettingName.PAGINATION_PAGE_SIZE];
    return perPage;
  }

  @state()
  get totalShown(): number {
    return this.start + this.perPage;
  }

  @state()
  get reachedEnd(): boolean {
    return this.totalShown >= this.total;
  }

  @state()
  get sortIsDefault(): boolean {
    return (
      this.state.listSort.direction === ListSortDirection.DESC &&
      this.state.listSort.property === ListSortProperty.OCCURRED_AT
    );
  }

  get lazyLoaderIsVisible(): boolean {
    const rect = this.lazyLoader.getBoundingClientRect();
    const docHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom <= docHeight;
  }

  @state()
  get paginationType(): PaginationType {
    return (
      this.state.listSetting[SettingName.PAGINATION_TYPE] ?? PaginationType.LAZY
    );
  }

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('scroll', this.scrollHandler);

    const urlHasChanged = this.state.lastListUrl !== this.getUrl();

    if (urlHasChanged) {
      this.state.setListItems([]);
      this.state.setContextListItems([]);
    }

    this.load();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  sync(reset = false): void {
    if (reset) {
      this.start = 0;
    }

    this.listFilter.sync();
    this.load();
  }

  private handleItemDeleted(e: ActionItemDeletedEvent): void {
    this.state.setListItems(
      this.state.listItems.filter(item => item.id !== e.detail.id),
    );
  }

  private handleItemUpdated(e: ActionItemUpdatedEvent): void {
    const updatedList = this.state.listItems
      .map(item =>
        item.id === e.detail.id
          ? {
              ...item,
              desc: e.detail.desc,
              occurredAt: e.detail.occurredAt,
              tags: e.detail.tags,
            }
          : item,
      )
      .sort((a, b) =>
        this.state.listSort.direction === ListSortDirection.DESC
          ? b[this.state.listSort.property].localeCompare(
              a[this.state.listSort.property],
            )
          : a[this.state.listSort.property].localeCompare(
              b[this.state.listSort.property],
            ),
      );
    this.state.setListItems(updatedList);
  }

  private handleScroll(): void {
    if (this.paginationType === PaginationType.LAZY) {
      if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
        this.load(true);
      }
    }
  }

  private getUrl(more = false): string {
    if (more) {
      this.start += this.perPage;
    }

    const queryParams = {
      perPage: `${this.perPage}`,
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

    return url;
  }

  async load(more = false): Promise<void> {
    this.loading = true;

    try {
      const url = this.getUrl(more);
      this.state.setLastListUrl(url);

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
          this.total = result.response.total;
        }
      }
    } catch (error) {
      console.error(`Failed to get list: ${JSON.stringify(error)}`);
    } finally {
      this.ready = true;
      this.loading = false;
    }
  }

  private handleFilterUpdated(_e: ListFilterUpdatedEvent): void {
    this.filterIsOpen = false;
    this.load();
  }

  private handleSortUpdated(_e: ListSortUpdatedEvent): void {
    this.load();
  }

  private handleSettingUpdated(_e: CustomEvent): void {
    this.load();
  }

  private handleContextUpdated(_e: ListContextUpdatedEvent): void {
    this.load();
  }

  private handlePageChanged(e: PageChangedEvent): void {
    this.start = e.detail.start;
    this.load();
  }

  private toggleSetting(): void {
    this.settingIsOpen = !this.settingIsOpen;
  }

  private toggleFilter(): void {
    this.filterIsOpen = !this.filterIsOpen;
  }

  private toggleSort(): void {
    this.sortIsOpen = !this.sortIsOpen;
  }

  private toggleContext(): void {
    this.contextIsOpen = !this.contextIsOpen;
  }

  private toggleActionContext(id: number): void {
    const state = this.actionContextIsOpen.get(id);
    if (state) {
      this.actionContextIsOpen.set(id, false);
    } else {
      this.actionContextIsOpen.set(id, true);
    }
    this.requestUpdate();
  }

  private handlePointerLongPress(e: PointerLongPressEvent): void {
    const listItem = e.target as ActionListItem;
    this.state.toggleActionSelection(listItem.actionId);
  }

  private handlePointerUp(e: PointerUpEvent): void {
    const listItem = e.target as ActionListItem;
    if (!this.state.selectMode) {
      listItem.setMode(ActionListItemMode.EDIT);
      return;
    }
    this.state.toggleActionSelection(listItem.actionId);
  }

  private renderContextActions(
    type: ListContextType,
    item: ActionItem,
  ): TemplateResult | typeof nothing {
    return this.state.listContext.type === type &&
      this.state.contextListItems[item.id]?.length
      ? html`
          <ss-collapsable
            title=${translate('showContext')}
            @toggled=${() => {
              this.toggleActionContext(item.id);
            }}
            ?open=${this.actionContextIsOpen.get(item.id)}
          >
            ${this.state.contextListItems[item.id].map(
              contextAction => html`
                <action-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${contextAction.id}
                  type=${contextAction.type}
                  desc=${contextAction.desc}
                  occurredAt=${contextAction.occurredAt}
                  .tags=${contextAction.tags}
                  ?selected=${this.state.selectedActions.includes(
                    contextAction.id,
                  )}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                ></action-list-item>
              `,
            )}
          </ss-collapsable>
        `
      : nothing;
  }

  render(): TemplateResult {
    return html`
      <ss-collapsable
        title=${translate('settings')}
        ?open=${this.settingIsOpen}
        @toggled=${this.toggleSetting}
      >
        <setting-form
          listConfigId=${this.state.listConfigId}
          @setting-updated=${this.handleSettingUpdated}
        ></setting-form>
      </ss-collapsable>

      <ss-collapsable
        title=${translate('filter')}
        ?open=${this.filterIsOpen}
        @toggled=${this.toggleFilter}
      >
        <div class="filter-body">
          <list-filter
            @filter-updated=${this.handleFilterUpdated}
          ></list-filter>
        </div>
      </ss-collapsable>

      <ss-collapsable
        title=${translate('sort')}
        ?open=${this.sortIsOpen}
        @toggled=${this.toggleSort}
      >
        <list-sort @list-sort-updated=${this.handleSortUpdated}></list-sort>
      </ss-collapsable>

      ${!this.state.listFilter.includeAll
        ? html`
            <ss-collapsable
              title=${translate('context')}
              ?open=${this.contextIsOpen}
              @toggled=${this.toggleContext}
            >
              <list-context
                @list-context-updated=${this.handleContextUpdated}
              ></list-context>
            </ss-collapsable>
          `
        : nothing}

      <div class="box list-items">
        ${this.loading ? html` <ss-loader padded></ss-loader> ` : nothing}
        ${this.state.listItems.length
          ? repeat(
              this.state.listItems,
              item => item.id,
              item => html`
                ${this.renderContextActions(ListContextType.AFTER, item)}
                <action-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${item.id}
                  type=${item.type}
                  desc=${item.desc}
                  occurredAt=${item.occurredAt}
                  .tags=${item.tags}
                  ?selected=${this.state.selectedActions.includes(item.id)}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                  @action-item-deleted=${this.handleItemDeleted}
                  @action-item-updated=${this.handleItemUpdated}
                ></action-list-item>
                ${this.renderContextActions(ListContextType.BEFORE, item)}
              `,
            )
          : !this.loading
            ? html` <div class="no-actions">
                ${translate('noActionsFound')}
              </div>`
            : nothing}
        <div id="lazy-loader"></div>
      </div>
      ${this.paginationType === PaginationType.NAVIGATION
        ? html`
            <list-paginator
              @page-changed=${this.handlePageChanged}
              start=${this.start}
              total=${this.total}
              perPage=${this.perPage}
            ></list-paginator>
          `
        : this.paginationType === PaginationType.MORE_BUTTON && !this.reachedEnd
          ? html`
              <div class="more box">
                <ss-button
                  text=${translate('loadMore')}
                  @click=${() => this.load(true)}
                  ?loading=${this.loading}
                  ?disabled=${this.loading}
                ></ss-button>
              </div>
            `
          : nothing}
    `;
  }
}
