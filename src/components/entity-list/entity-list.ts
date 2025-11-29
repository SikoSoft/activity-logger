import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { PaginationType, SettingName } from 'api-spec/models/Setting';
import {
  ListSortDirection,
  ListSortNativeProperty,
} from 'api-spec/models/List';
import { Entity } from 'api-spec/models/Entity';
import { api } from '@/lib/Api';
import { appState } from '@/state';
import { ViewElement } from '@/lib/ViewElement';
import { translate } from '@/lib/Localization';

import { ListSortUpdatedEvent } from '@/components/list-sort/list-sort.events';
import { PointerLongPressEvent } from '@/events/pointer-long-press';
import { PointerUpEvent } from '@/events/pointer-up';
import { PageChangedEvent } from '@/components/list-paginator/list-paginator.events';
import { ListFilterUpdatedEvent } from '../list-filter/list-filter.events';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-loader';
import '@ss/ui/components/ss-collapsable';
import '@/components/list-sort/list-sort';
import '@/components/list-context/list-context';
import '@/components/list-paginator/list-paginator';
import '@/components/setting/setting-form/setting-form';
import '@/components/entity-list/entity-list-item/entity-list-item';
import '@/components/list-filter/list-filter';
import { ListFilter } from '@/components/list-filter/list-filter';
import { EntityListItem } from './entity-list-item/entity-list-item';

import { EntityListItemMode } from './entity-list-item/entity-list-item.models';
import {
  EntityItemDeletedEvent,
  EntityItemUpdatedEvent,
} from '../entity-form/entity-form.events';
import { storage } from '@/lib/Storage';
import { themed } from '@/lib/Theme';

@themed()
@customElement('entity-list')
export class EntityList extends ViewElement {
  public state = appState;

  static styles = css`
    ss-collapsable {
      display: block;
      margin-top: 1rem;
    }

    .list-items {
      margin-top: 1rem;
      overflow: hidden;
    }

    entity-list-item:not(:last-of-type) {
      display: block;
      border-bottom: 1px solid #ccc;
    }

    .no-items {
      padding: 1rem;
    }

    .more {
      margin-top: 1rem;
    }
  `;

  private scrollHandler: EventListener = () => this.handleScroll();
  @query('#lazy-loader') lazyLoader!: HTMLDivElement;
  @query('list-filter') listFilter!: ListFilter;

  @state() start: number = 0;
  @state() total: number = 0;
  @state() loading: boolean = false;
  @state() filterIsOpen: boolean = false;
  @state() settingIsOpen: boolean = false;
  @state() sortIsOpen: boolean = false;

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
      this.state.listSort.property === ListSortNativeProperty.CREATED_AT
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

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    window.addEventListener('scroll', this.scrollHandler);

    const urlHasChanged = this.state.lastListUrl !== this.getUrl();

    if (urlHasChanged) {
      this.state.setListEntities([]);
    }

    await this.load();

    while (this.lazyLoaderIsVisible && !this.reachedEnd) {
      await this.handleScroll();
    }
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

  private handleItemDeleted(e: EntityItemDeletedEvent): void {
    this.state.setListEntities(
      this.state.listEntities.filter(item => item.id !== e.detail.id),
    );
  }

  private handleItemUpdated(e: EntityItemUpdatedEvent): void {
    const { properties, tags } = e.detail;

    const updatedList = this.state.listEntities.map(item =>
      item.id === e.detail.id
        ? {
            ...item,
            properties,
            tags,
          }
        : item,
    );

    this.state.setListEntities(updatedList);
  }

  private async handleScroll(): Promise<void> {
    if (this.paginationType === PaginationType.LAZY) {
      if (this.lazyLoaderIsVisible && !this.loading && !this.reachedEnd) {
        await this.load(true);
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
    };

    const url = `entity${
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
        entities: Entity[];
        total: number;
      }>(url);

      if (result) {
        if (result.response.entities) {
          this.state.setListEntities(
            more
              ? [...this.state.listEntities, ...result.response.entities]
              : [...result.response.entities],
          );
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
    storage.updateListFilter(this.state.listConfigId, this.state.listFilter);
    this.filterIsOpen = false;
    this.load();
  }

  private handleSortUpdated(_e: ListSortUpdatedEvent): void {
    storage.updateListSort(this.state.listConfigId, this.state.listSort);
    this.sortIsOpen = false;
    this.start = 0;
    this.load();
  }

  private handleSettingUpdated(_e: CustomEvent): void {
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

  private handlePointerLongPress(e: PointerLongPressEvent): void {
    const listItem = e.target as EntityListItem;
    this.state.toggleActionSelection(listItem.entityId);
  }

  private handlePointerUp(e: PointerUpEvent): void {
    const listItem = e.target as EntityListItem;
    if (!this.state.selectMode) {
      listItem.setMode(EntityListItemMode.EDIT);
      return;
    }
    this.state.toggleActionSelection(listItem.entityId);
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
            @list-filter-updated=${this.handleFilterUpdated}
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

      ${this.paginationType === PaginationType.NAVIGATION
        ? html`
            <list-paginator
              @page-changed=${this.handlePageChanged}
              start=${this.start}
              total=${this.total}
              perPage=${this.perPage}
            ></list-paginator>
          `
        : nothing}

      <div class="box list-items">
        ${this.loading ? html` <ss-loader padded></ss-loader> ` : nothing}
        ${this.state.listEntities.length
          ? html`${repeat(
              this.state.listEntities,
              item => item.id,
              item => html`
                <entity-list-item
                  ?debug=${this.state.debugMode}
                  entityId=${item.id}
                  type=${item.type}
                  createdAt=${item.createdAt}
                  updatedAt=${item.updatedAt}
                  .tags=${item.tags}
                  ?selected=${this.state.selectedActions.includes(item.id)}
                  .properties=${item.properties}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                  @entity-item-deleted=${this.handleItemDeleted}
                  @entity-item-updated=${this.handleItemUpdated}
                ></entity-list-item>
              `,
            )}
            ${this.loading ? html` <ss-loader padded></ss-loader> ` : nothing} `
          : !this.loading
            ? html` <div class="no-items">${translate('noItemsFound')}</div>`
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
        : nothing}
      ${this.paginationType === PaginationType.MORE_BUTTON && !this.reachedEnd
        ? html`
            <div class="more box">
              <ss-button
                text=${translate('loadMore')}
                @click=${(): Promise<void> => this.load(true)}
                ?loading=${this.loading}
                ?disabled=${this.loading}
              ></ss-button>
            </div>
          `
        : nothing}
    `;
  }
}
