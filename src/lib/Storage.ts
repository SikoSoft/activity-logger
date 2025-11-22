import { v4 as uuidv4 } from 'uuid';
import {
  ListConfig,
  ListContext,
  ListFilter,
  ListSort,
} from 'api-spec/models/List';
import { networkStorage } from './NetworkStorage';
import {
  defaultListContext,
  defaultListFilter,
  defaultListSort,
} from '@/state';
import { PageView, Theme, defaultPageView, defaultTheme } from '@/models/Page';
import { StorageItemKey, StorageSchema } from '@/models/Storage';
import { Setting } from 'api-spec/models/Setting';
import { Version } from '@/models/Version';
import { EntityConfig, EntityPropertyConfig } from 'api-spec/models/Entity';
import { Entity } from 'api-spec/models';
import { translate } from './Localization';
import { ExportDataContents, NukedDataType } from 'api-spec/models/Data';

export interface SavedListFilter {
  filter: ListFilter;
  id: string;
  name: string;
}

const storageDelegates: StorageSchema[] = [networkStorage];

function delegateSource(): MethodDecorator {
  return function (
    _target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    for (let i = 0; i < storageDelegates.length; i++) {
      const storageDelegate = storageDelegates[i];
      const delegateMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(storageDelegate),
      );
      const key =
        typeof propertyKey === 'symbol' ? propertyKey.toString() : propertyKey;
      if (delegateMethods.includes(key)) {
        const methodName = propertyKey as keyof StorageSchema;
        if (!storageDelegate || !storageDelegate[methodName]) {
          continue;
        }
        descriptor.value = storageDelegate[methodName];
        return descriptor;
      }
    }
    return;
  };
}

export class Storage implements StorageSchema {
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

  saveActiveFilter(filter: ListFilter): void {
    localStorage.setItem(
      StorageItemKey.ACTIVE_LIST_FILTER_KEY,
      JSON.stringify(filter),
    );
  }

  saveView(view: PageView): void {
    localStorage.setItem(StorageItemKey.VIEW_KEY, view);
  }

  getSavedView(): PageView {
    let view: PageView = defaultPageView;
    try {
      const storedView = localStorage.getItem(StorageItemKey.VIEW_KEY);
      if (storedView) {
        view = storedView as PageView;
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

  saveAdvancedMode(state: boolean): void {
    localStorage.setItem(StorageItemKey.ADVANCED_MODE_KEY, state ? '1' : '0');
  }

  saveDebugMode(state: boolean): void {
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

  async digestMessage(message: string): Promise<string> {
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(message),
    );
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  @delegateSource()
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
    }

    return Promise.resolve(listConfigs);
  }

  @delegateSource()
  async updateListSort(_listConfigId: string, _sort: ListSort): Promise<void> {
    Promise.resolve(null);
    return;
  }

  @delegateSource()
  async updateListFilter(
    _listConfigId: string,
    _filter: ListFilter,
  ): Promise<void> {
    Promise.resolve(null);
    return;
  }

  @delegateSource()
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

  @delegateSource()
  async addListConfig(): Promise<string> {
    const id = uuidv4();
    const listConfig = {
      id,
      name: translate('configName'),
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

  @delegateSource()
  async deleteListConfig(id: string): Promise<boolean> {
    const listConfigs = await this.getListConfigs();
    localStorage.setItem(
      StorageItemKey.LIST_CONFIGS_KEY,
      JSON.stringify(listConfigs.filter(config => id !== config.id)),
    );

    return Promise.resolve(true);
  }

  saveListContextMode(mode: boolean): void {
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

  saveListContext(listContext: ListContext): void {
    localStorage.setItem(
      StorageItemKey.LIST_CONTEXT,
      JSON.stringify(listContext),
    );
  }

  getListContext(): ListContext {
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

  saveActiveListConfigId(id: string): void {
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

  setAuthToken(authToken: string): void {
    localStorage.setItem(StorageItemKey.AUTH_TOKEN_KEY, authToken);
  }

  getAuthToken(): string {
    let authToken = '';
    try {
      const storedAuthToken = localStorage.getItem(
        StorageItemKey.AUTH_TOKEN_KEY,
      );
      if (storedAuthToken) {
        authToken = storedAuthToken;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to get authToken: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return authToken;
  }

  @delegateSource()
  async saveSetting(
    _listConfigId: string,
    _setting: Setting,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  getVersion(): Version {
    try {
      const storageVersion = localStorage.getItem(StorageItemKey.VERSION);

      if (storageVersion) {
        return storageVersion as Version;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to get version from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return Version.V1;
  }

  saveVersion(version: Version): void {
    localStorage.setItem(StorageItemKey.VERSION, version);
  }

  setWindowScrollPosition(x: number, y: number): void {
    localStorage.setItem(
      StorageItemKey.WINDOW_SCROLL_POSITION,
      JSON.stringify({ x, y }),
    );
  }

  getWindowScrollPosition(): { x: number; y: number } {
    let position = { x: 0, y: 0 };
    try {
      const storedPosition = localStorage.getItem(
        StorageItemKey.WINDOW_SCROLL_POSITION,
      );
      if (storedPosition) {
        position = JSON.parse(storedPosition);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load window scroll position from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return position;
  }

  getCollapsablePanelState(): Record<string, boolean> {
    let state: Record<string, boolean> = {};
    try {
      const storedState = localStorage.getItem(
        StorageItemKey.COLLAPSABLE_PANEL_STATE,
      );
      if (storedState) {
        state = JSON.parse(storedState);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load collapsable panel state from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return state;
  }

  setCollapsablePanelState(state: Record<string, boolean>): void {
    localStorage.setItem(
      StorageItemKey.COLLAPSABLE_PANEL_STATE,
      JSON.stringify(state),
    );
  }

  getTabState(): Record<string, number> {
    let state: Record<string, number> = {};
    try {
      const storedState = localStorage.getItem(StorageItemKey.TAB_INDEX_STATE);
      if (storedState) {
        state = JSON.parse(storedState);
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load tab state from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return state;
  }

  setTabState(state: Record<string, number>): void {
    localStorage.setItem(StorageItemKey.TAB_INDEX_STATE, JSON.stringify(state));
  }

  @delegateSource()
  async addEntityConfig(
    _entityConfig: EntityConfig,
  ): Promise<Entity.EntityConfig | null> {
    return Promise.resolve(null);
  }

  @delegateSource()
  async updateEntityConfig(
    _entityConfig: EntityConfig,
  ): Promise<Entity.EntityConfig | null> {
    return Promise.resolve(null);
  }

  @delegateSource()
  async getEntityConfigs(): Promise<EntityConfig[]> {
    return Promise.resolve([]);
  }

  @delegateSource()
  async deleteEntityConfig(_id: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  @delegateSource()
  async deletePropertyConfig(
    _entityConfigId: number,
    _id: number,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  @delegateSource()
  async addPropertyConfig(
    _propertyConfig: EntityPropertyConfig,
  ): Promise<Entity.EntityPropertyConfig | null> {
    return Promise.resolve(null);
  }

  @delegateSource()
  async updatePropertyConfig(
    _propertyConfig: EntityPropertyConfig,
    _performDriftCheck: boolean,
  ): Promise<Entity.EntityPropertyConfig | null> {
    return Promise.resolve(null);
  }

  @delegateSource()
  async setEntityPropertyOrder(
    _entityConfigId: number,
    _propertyConfigOrder: { id: number; order: number }[],
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  @delegateSource()
  async export(_entityConfigIds: number[]): Promise<Entity.Entity[]> {
    return Promise.resolve([]);
  }

  @delegateSource()
  async clearData(_nukedDataTypes: NukedDataType[]): Promise<void> {
    return Promise.resolve();
  }

  @delegateSource()
  async import(_data: ExportDataContents): Promise<boolean> {
    return Promise.resolve(true);
  }

  setTheme(theme: Theme): void {
    if (!Object.values(Theme).includes(theme)) {
      localStorage.setItem(StorageItemKey.THEME, defaultTheme);
      return;
    }

    localStorage.setItem(StorageItemKey.THEME, theme);
  }

  getTheme(): Theme {
    let theme: Theme = defaultTheme;
    try {
      const storedTheme = localStorage.getItem(StorageItemKey.THEME);
      if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
        theme = storedTheme as Theme;
      }
    } catch (error) {
      console.error(
        `Encountered an error while trying to load theme from storage: ${JSON.stringify(
          error,
        )}`,
      );
    }

    return theme;
  }
}

export const storage = new Storage();
