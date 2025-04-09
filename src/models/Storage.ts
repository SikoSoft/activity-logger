import { Setting } from 'api-spec/models/Setting';
import { ListConfig } from 'api-spec/models/List';

export enum StorageItemKey {
  ACTIVE_LIST_FILTER_KEY = 'listFilter',
  LIST_FILTERS_KEY = 'listFilters',
  VIEW_KEY = 'view',
  ADVANCED_MODE_KEY = 'advancedMode',
  DEBUG_MODE_KEY = 'debugMode',
  LIST_CONFIGS_KEY = 'listConfigs',
  LIST_CONTEXT_MODE = 'listContextMode',
  LIST_CONTEXT = 'listContext',
  ACTIVE_LIST_CONFIG_ID = 'activeListConfigId',
  AUTH_TOKEN_KEY = 'authToken',
}

export interface StorageSchema {
  setAuthToken?(authToken: string): void;
  getAuthToken?(): string;
  getListConfigs?(): Promise<ListConfig[]>;
  addListConfig?(): Promise<string>;
  deleteListConfig?(id: string): Promise<boolean>;
  saveListConfig?(listConfig: ListConfig): Promise<void>;
  saveSetting?(listConfigId: string, setting: Setting): Promise<boolean>;
}
