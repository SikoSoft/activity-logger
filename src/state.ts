import { v4 as uuidv4 } from 'uuid';
import { action, makeObservable, observable } from 'mobx';

import {
  ListFilter,
  ListFilterType,
  ListFilterTimeType,
  TimeContext,
  ListSort,
  ListSortDirection,
  ListSortProperty,
  ListConfig,
} from 'api-spec/models/List';

const defaultListFilter: ListFilter = {
  tagging: {
    [ListFilterType.CONTAINS_ALL_OF]: [],
    [ListFilterType.CONTAINS_ONE_OF]: [],
  },
  includeUntagged: true,
  includeAll: true,
  time: { type: ListFilterTimeType.ALL_TIME },
  text: [],
};

const defaultListSort: ListSort = {
  property: ListSortProperty.OCCURRED_AT,
  direction: ListSortDirection.DESC,
};

import { Toast } from '@/models/Toast';
import { ActionItem } from '@/models/Action';

export class AppState {
  @observable
  public listItems: ActionItem[] = [];

  @observable
  public suggestions: string[] = [];

  @observable
  public toasts: Toast[] = [];

  @observable
  public loading: boolean = false;

  @observable
  public listFilter: ListFilter = structuredClone(defaultListFilter);

  @observable
  public listSort: ListSort = structuredClone(defaultListSort);

  @observable
  public advancedMode: boolean = false;

  @observable
  public debugMode: boolean = false;

  @observable
  public selectMode: boolean = false;

  @observable
  public editListConfigMode: boolean = false;

  @observable
  public selectedActions: number[] = [];

  get listConfig(): ListConfig {
    return this.listConfigs.filter(
      config => this.listConfigId === config.id,
    )[0];
  }
  /*
  public listConfig: ListConfig = {
    filter: structuredClone(defaultListFilter),
    sort: structuredClone(defaultListSort),
    name: 'My list',
    id: '',
  };
  */

  @observable
  public listConfigId: string = '';

  @observable
  public listConfigs: ListConfig[] = [];

  @action
  public setAutoSuggestions(suggestions: string[]) {
    this.suggestions = suggestions;
  }

  @action
  public addToast(message: string) {
    const id = uuidv4();
    const startTime = new Date();
    this.toasts.push({
      id,
      message,
      startTime,
    });
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  }

  @action
  removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  @action
  setLoading(state: boolean) {
    this.loading = state;
  }

  @action
  setListFilterTagging(type: ListFilterType, tags: string[]) {
    this.listFilter.tagging[type] = tags;
  }

  @action
  setListFilterIncludeUntagged(state: boolean) {
    this.listFilter.includeUntagged = state;
  }

  @action
  setListFilterIncludeAll(state: boolean) {
    this.listFilter.includeAll = state;
  }

  @action
  setListFilterTime(time: TimeContext) {
    this.listFilter.time = time;
  }

  @action
  setListFilter(filter: ListFilter) {
    console.log('setListFilter', JSON.stringify(filter));
    this.listFilter = filter;
  }

  /*
  @action
  setListConfig(listConfig: ListConfig) {
    this.listConfig = listConfig;
  }
    */

  @action
  setListConfigId(id: string) {
    console.log('setListConfigId', id);
    this.listConfigId = id;
    console.log('listConfig', JSON.stringify(this.listConfig));
    this.setListFilter(this.listConfig.filter);
    this.setListSort(this.listConfig.sort);
  }

  @action
  setListConfigs(listConfigs: ListConfig[]) {
    this.listConfigs = listConfigs;
  }

  @action
  setAdvancedMode(state: boolean) {
    this.advancedMode = state;
  }

  @action
  setDebugMode(state: boolean) {
    this.debugMode = state;
  }

  @action
  setEditListConfigMode(state: boolean) {
    this.editListConfigMode = state;
  }

  @action
  setListSort(sort: ListSort) {
    this.listSort = sort;
  }

  @action
  setSelectMode(state: boolean) {
    this.selectMode = state;
  }

  @action
  setSelectedActions(actionIds: number[]) {
    this.selectedActions = actionIds;
  }

  @action
  addActionToSelection(actionId: number) {
    this.selectedActions = [
      ...this.selectedActions.filter(id => id !== actionId),
      actionId,
    ];
    this.selectMode = true;
  }

  @action
  removeActionFromSelection(actionId: number) {
    this.selectedActions = [
      ...this.selectedActions.filter(id => id !== actionId),
    ];
    this.selectMode = this.selectedActions.length > 0;
  }

  @action
  toggleActionSelection(actionId: number) {
    this.selectedActions.includes(actionId)
      ? this.removeActionFromSelection(actionId)
      : this.addActionToSelection(actionId);
  }

  @action
  setListItems(items: ActionItem[]) {
    this.listItems = items;
  }

  @action
  toggleSelectAll() {
    this.selectedActions = this.listItems.reduce(
      (a, b) => (this.selectedActions.includes(b.id) ? [...a] : [...a, b.id]),
      [] as number[],
    );
  }

  @action
  selectAll() {
    this.selectedActions = this.listItems.map(item => item.id);
  }

  constructor() {
    makeObservable(this);
  }
}

export const appState = new AppState();
