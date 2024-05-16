import { ListFilter } from '../models/ListFilter';
import { AppState, appState } from '../state';

export class Storage {
  static LIST_FILTER_KEY = 'listFilter';
  private state: AppState;

  constructor(appState: AppState) {
    this.state = appState;
  }

  saveFilter(filter: ListFilter) {
    localStorage.setItem(Storage.LIST_FILTER_KEY, JSON.stringify(filter));
  }

  loadFilter() {
    try {
      const storedFilter = localStorage.getItem(Storage.LIST_FILTER_KEY);
      if (storedFilter) {
        const filter = JSON.parse(storedFilter) as ListFilter;
        this.state.setListFilter(filter);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load filter: ${JSON.stringify(
          error
        )}`
      );
    }
  }
}

export const storage = new Storage(appState);
