import { v4 as uuidv4 } from 'uuid';
import { ListConfig, ListContext, ListFilter } from 'api-spec/models/List';
import { msg } from '@lit/localize';
import { networkStorage } from './NetworkStorage';
import { browserStorage } from './BrowserStorage';

import {
  AppState,
  appState,
  defaultListContext,
  defaultListFilter,
  defaultListSort,
} from '@/state';
import { ActionView, defaultActionView } from '@/models/Action';
import { StorageItemKey, StorageSchema } from '@/models/Storage';

export interface SavedListFilter {
  filter: ListFilter;
  id: string;
  name: string;
}

const storageDelegates: StorageSchema[] = [browserStorage, networkStorage];

function delegateSource() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    for (let i = 0; i < storageDelegates.length; i++) {
      const storageDelegate = storageDelegates[i];
      const delegateMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(storageDelegate),
      );
      if (delegateMethods.includes(propertyKey)) {
        const methodName = propertyKey as keyof StorageSchema;
        if (!storageDelegate || !storageDelegate[methodName]) {
          return;
        }
        descriptor.value = storageDelegate[methodName];
      }
    }
  };
}

export class Storage implements StorageSchema {
  private state: AppState;

  constructor(appState: AppState) {
    this.state = appState;
  }

  async saveFilter(filter: ListFilter, name: string): Promise<void> {
    const savedFilters = this.getSavedFilters();
    const id = await this.digestMessage(JSON.stringify(filter));
    localStorage.setItem(
      StorageItemKey.LIST_FILTERS_KEY,
      JSON.stringify([
        ...savedFilters.filter(filter => filter.id !== id),
        { filter, id, name },
      ]),
    );
  }

  getSavedFilters(): SavedListFilter[] {
    let filters: SavedListFilter[] = [];
    try {
      const storedFilters = localStorage.getItem(
        StorageItemKey.LIST_FILTERS_KEY,
      );
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
      StorageItemKey.LIST_FILTERS_KEY,
      JSON.stringify([...savedFilters.filter(filter => filter.id !== id)]),
    );
  }

  saveActiveFilter(filter: ListFilter) {
    localStorage.setItem(
      StorageItemKey.ACTIVE_LIST_FILTER_KEY,
      JSON.stringify(filter),
    );
  }

  loadActiveFilter() {
    try {
      const storedFilter = localStorage.getItem(
        StorageItemKey.ACTIVE_LIST_FILTER_KEY,
      );
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
    localStorage.setItem(StorageItemKey.VIEW_KEY, view);
  }

  getSavedView(): ActionView {
    let view: ActionView = defaultActionView;
    try {
      const storedView = localStorage.getItem(StorageItemKey.VIEW_KEY);
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
    localStorage.setItem(StorageItemKey.ADVANCED_MODE_KEY, state ? '1' : '0');
  }

  saveDebugMode(state: boolean) {
    localStorage.setItem(StorageItemKey.DEBUG_MODE_KEY, state ? '1' : '0');
  }

  getAdvancedMode(): boolean {
    let advancedMode = false;
    try {
      const storedAdvancedMode = localStorage.getItem(
        StorageItemKey.ADVANCED_MODE_KEY,
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
      const storedDebugMode = localStorage.getItem(
        StorageItemKey.DEBUG_MODE_KEY,
      );
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

  async getListConfigs(): Promise<ListConfig[]> {
    let listConfigs: ListConfig[] = [];
    try {
      const storedListConfigs = localStorage.getItem(
        StorageItemKey.LIST_CONFIGS_KEY,
      );
      if (storedListConfigs) {
        listConfigs = JSON.parse(storedListConfigs) as ListConfig[];
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load list configurations from storage: ${JSON.stringify(
          error,
        )}`,
      );
      //return Promise.reject();
    }

    return Promise.resolve(listConfigs);
    //return listConfigs;
  }

  async saveListConfig(listConfig: ListConfig): Promise<void> {
    const listConfigs = await this.getListConfigs();

    localStorage.setItem(
      StorageItemKey.LIST_CONFIGS_KEY,
      JSON.stringify(
        listConfigs.map(config =>
          listConfig.id === config.id ? listConfig : config,
        ),
      ),
    );
  }

  async addListConfig(): Promise<string> {
    const id = uuidv4();
    const listConfig = {
      id,
      name: msg('Config Name'),
      filter: defaultListFilter,
      sort: defaultListSort,
    };
    const listConfigs = await this.getListConfigs();
    localStorage.setItem(
      StorageItemKey.LIST_CONFIGS_KEY,
      JSON.stringify([...listConfigs, listConfig]),
    );
    return id;
  }

  async deleteListConfig(id: string): Promise<boolean> {
    const listConfigs = await this.getListConfigs();
    localStorage.setItem(
      StorageItemKey.LIST_CONFIGS_KEY,
      JSON.stringify(listConfigs.filter(config => id !== config.id)),
    );

    return Promise.resolve(true);
  }

  saveListContextMode(mode: boolean) {
    localStorage.setItem(StorageItemKey.LIST_CONTEXT_MODE, mode ? '1' : '0');
  }

  getListContextMode(): boolean {
    let mode = false;
    try {
      const storedMode = localStorage.getItem(StorageItemKey.LIST_CONTEXT_MODE);
      if (storedMode) {
        mode = storedMode === '1' ? true : false;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load list context mode from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return mode;
  }

  saveListContext(listContext: ListContext) {
    localStorage.setItem(
      StorageItemKey.LIST_CONTEXT,
      JSON.stringify(listContext),
    );
  }

  getListContext() {
    let listContext: ListContext = defaultListContext;
    try {
      const storedListContext = localStorage.getItem(
        StorageItemKey.LIST_CONTEXT,
      );
      if (storedListContext) {
        listContext = JSON.parse(storedListContext);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load list context from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return listContext;
  }

  saveActiveListConfigId(id: string) {
    localStorage.setItem(StorageItemKey.ACTIVE_LIST_CONFIG_ID, id);
  }

  getActiveListConfigId(): string {
    let listConfigId: string = '';
    try {
      const storedListConfigId = localStorage.getItem(
        StorageItemKey.ACTIVE_LIST_CONFIG_ID,
      );
      if (storedListConfigId) {
        listConfigId = storedListConfigId;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load active list config ID from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return listConfigId;
  }

  @delegateSource()
  setAuthToken(): any {}

  @delegateSource()
  getAuthToken(): any {}
}

export const storage = new Storage(appState);
