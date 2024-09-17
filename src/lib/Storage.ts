import { v4 as uuidv4 } from 'uuid';
import { ListConfig, ListFilter } from 'api-spec/models/List';

import {
  AppState,
  appState,
  defaultListFilter,
  defaultListSort,
} from '@/state';
import { ActionView, defaultActionView } from '@/models/Action';
import { translate } from '@/util/strings';

export interface SavedListFilter {
  filter: ListFilter;
  id: string;
  name: string;
}

export class Storage {
  static ACTIVE_LIST_FILTER_KEY = 'listFilter';
  static LIST_FILTERS_KEY = 'listFilters';
  static VIEW_KEY = 'view';
  static ADVANCED_MODE_KEY = 'advancedMode';
  static DEBUG_MODE_KEY = 'debugMode';
  static LIST_CONFIGS_KEY = 'listConfigs';

  private state: AppState;

  constructor(appState: AppState) {
    this.state = appState;
  }

  async saveFilter(filter: ListFilter, name: string): Promise<void> {
    const savedFilters = this.getSavedFilters();
    const id = await this.digestMessage(JSON.stringify(filter));
    localStorage.setItem(
      Storage.LIST_FILTERS_KEY,
      JSON.stringify([
        ...savedFilters.filter(filter => filter.id !== id),
        { filter, id, name },
      ]),
    );
  }

  getSavedFilters(): SavedListFilter[] {
    let filters: SavedListFilter[] = [];
    try {
      const storedFilters = localStorage.getItem(Storage.LIST_FILTERS_KEY);
      if (storedFilters) {
        filters = JSON.parse(storedFilters) as SavedListFilter[];
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load filters from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return filters;
  }

  deleteSavedFilter(id: string): void {
    const savedFilters = this.getSavedFilters();
    localStorage.setItem(
      Storage.LIST_FILTERS_KEY,
      JSON.stringify([...savedFilters.filter(filter => filter.id !== id)]),
    );
  }

  saveActiveFilter(filter: ListFilter) {
    localStorage.setItem(
      Storage.ACTIVE_LIST_FILTER_KEY,
      JSON.stringify(filter),
    );
  }

  loadActiveFilter() {
    try {
      const storedFilter = localStorage.getItem(Storage.ACTIVE_LIST_FILTER_KEY);
      if (storedFilter) {
        const filter = JSON.parse(storedFilter) as ListFilter;
        this.state.setListFilter(filter);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load filter: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }

  saveView(view: ActionView) {
    localStorage.setItem(Storage.VIEW_KEY, view);
  }

  getSavedView(): ActionView {
    let view: ActionView = defaultActionView;
    try {
      const storedView = localStorage.getItem(Storage.VIEW_KEY);
      if (storedView) {
        view = storedView as ActionView;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load view: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return view;
  }

  saveAdvancedMode(state: boolean) {
    localStorage.setItem(Storage.ADVANCED_MODE_KEY, state ? '1' : '0');
  }

  saveDebugMode(state: boolean) {
    localStorage.setItem(Storage.DEBUG_MODE_KEY, state ? '1' : '0');
  }

  getAdvancedMode(): boolean {
    let advancedMode = false;
    try {
      const storedAdvancedMode = localStorage.getItem(
        Storage.ADVANCED_MODE_KEY,
      );
      if (storedAdvancedMode) {
        advancedMode = storedAdvancedMode === '1';
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to advanced mode: ${JSON.stringify(
          error,
        )}`,
      );
    }
    return advancedMode;
  }

  getDebugMode(): boolean {
    let debugMode = false;
    try {
      const storedDebugMode = localStorage.getItem(Storage.DEBUG_MODE_KEY);
      if (storedDebugMode) {
        debugMode = storedDebugMode === '1';
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to debug mode: ${JSON.stringify(
          error,
        )}`,
      );
    }
    return debugMode;
  }

  async digestMessage(message: string) {
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(message),
    );
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  getListConfigs(): ListConfig[] {
    console.log('getListConfigs');
    let listConfigs: ListConfig[] = [];
    try {
      const storedListConfigs = localStorage.getItem(Storage.LIST_CONFIGS_KEY);
      if (storedListConfigs) {
        listConfigs = JSON.parse(storedListConfigs) as ListConfig[];
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load list configurations from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    console.log(listConfigs);
    return listConfigs;
  }

  saveListConfig(listConfig: ListConfig): void {
    console.log('saveListConfig', listConfig);
    const listConfigs = this.getListConfigs();
    console.log('listConfigs', listConfigs);

    localStorage.setItem(
      Storage.LIST_CONFIGS_KEY,
      JSON.stringify(
        listConfigs.map(config =>
          listConfig.id === config.id ? listConfig : config,
        ),
      ),
    );
  }

  addListConfig(): string {
    const id = uuidv4();
    console.log('addListConfig', id);
    const listConfig = {
      id,
      name: translate('configName'),
      filter: defaultListFilter,
      sort: defaultListSort,
    };
    const listConfigs = this.getListConfigs();
    localStorage.setItem(
      Storage.LIST_CONFIGS_KEY,
      JSON.stringify([...listConfigs, listConfig]),
    );
    return id;
  }

  deleteListConfig(id: string) {
    console.log('deleteListConfig', id);
    const listConfigs = this.getListConfigs();
    localStorage.setItem(
      Storage.LIST_CONFIGS_KEY,
      JSON.stringify(listConfigs.filter(config => id !== config.id)),
    );
  }
}

export const storage = new Storage(appState);
