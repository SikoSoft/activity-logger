import { v4 as uuidv4 } from 'uuid';
import { action, makeObservable, observable } from 'mobx';
import { Toast } from './models/Toast';
import { ListFilter, ListFilterType } from './models/ListFilter';

export class AppState {
  @observable
  public suggestions: string[] = [];

  @observable
  public toasts: Toast[] = [];

  @observable
  public loading: boolean = false;

  @observable
  public listFilter: ListFilter = {
    tagging: {
      [ListFilterType.CONTAINS_ALL_OF]: [],
      [ListFilterType.CONTAINS_ONE_OF]: [],
    },
    includeUntagged: true,
    includeAll: true,
  };

  @action
  public setAutoSuggestions(suggestions: string[]) {
    console.log('setAutoSuggestions', suggestions);
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
  setListFilter(filter: ListFilter) {
    this.listFilter = filter;
  }

  constructor() {
    makeObservable(this);
  }
}

export const appState = new AppState();
