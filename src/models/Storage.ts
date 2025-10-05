import { Setting } from 'api-spec/models/Setting';
import { ListConfig } from 'api-spec/models/List';
import { EntityConfig, EntityPropertyConfig } from 'api-spec/models/Entity';
import { Entity } from 'api-spec/models';

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
  VERSION = 'version',
  WINDOW_SCROLL_POSITION = 'windowScrollPosition',
  COLLAPSABLE_PANEL_STATE = 'collapsablePanelState',
}

export interface StorageSchema {
  setAuthToken?(authToken: string): void;
  getAuthToken?(): string;
  getListConfigs?(): Promise<ListConfig[]>;
  addListConfig?(): Promise<string>;
  deleteListConfig?(id: string): Promise<boolean>;
  saveListConfig?(listConfig: ListConfig): Promise<void>;
  saveSetting?(listConfigId: string, setting: Setting): Promise<boolean>;
  updateEntityConfig?(
    entityConfig: EntityConfig,
  ): Promise<Entity.EntityConfig | null>;
  addEntityConfig?(
    entityConfig: EntityConfig,
  ): Promise<Entity.EntityConfig | null>;
  getEntityConfigs?(): Promise<EntityConfig[]>;
  deleteEntityConfig?(id: number): Promise<boolean>;
  deletePropertyConfig?(entityConfigId: number, id: number): Promise<boolean>;
  addPropertyConfig?(
    propertyConfig: EntityPropertyConfig,
  ): Promise<Entity.EntityPropertyConfig | null>;
  updatePropertyConfig?(
    propertyConfig: EntityPropertyConfig,
  ): Promise<Entity.EntityPropertyConfig | null>;
  setWindowScrollPosition?(x: number, y: number): void;
  getWindowScrollPosition?(): { x: number; y: number };
  getCollapsablePanelState?(): Record<string, boolean>;
  setCollapsablePanelState?(state: Record<string, boolean>): void;
  setEntityPropertyOrder?(
    entityConfigId: number,
    propertyConfigOrder: { id: number; order: number }[],
  ): Promise<boolean>;
}
