import { ListConfig, ListSort, ListFilter } from 'api-spec/models/List';
import { api } from './Api';
import { StorageSchema } from '@/models/Storage';
import { Setting } from 'api-spec/models/Setting';
import { EntityConfig, EntityPropertyConfig } from 'api-spec/models/Entity';
import { Entity } from 'api-spec/models';
import { translate } from './Localization';
import { ExportDataContents, NukedDataType } from 'api-spec/models/Data';

export class NetworkStorage implements StorageSchema {
  async getListConfigs(): Promise<ListConfig[]> {
    const result = await api.get<{ listConfigs: ListConfig[] }>('listConfig');

    if (result) {
      return Promise.resolve(result.response.listConfigs);
    }

    return Promise.reject();
  }

  async saveListConfig(listConfig: ListConfig): Promise<void> {
    await api.put<ListConfig, ListConfig>(
      `listConfig/${listConfig.id}`,
      listConfig,
    );
  }

  async updateListSort(listConfigId: string, sort: ListSort): Promise<void> {
    const result = await api.put<ListSort, null>(
      `listSort/${listConfigId}`,
      sort,
    );
    //return;
  }

  async updateListFilter(
    listConfigId: string,
    filter: ListFilter,
  ): Promise<void> {
    const result = await api.put<ListFilter, null>(
      `listFilter/${listConfigId}`,
      filter,
    );
    //return;
  }

  async addListConfig(): Promise<string> {
    const result = await api.post<{ name: string }, { id: string }>(
      'listConfig',
      {
        name: translate('configName'),
      },
    );

    if (result) {
      return result.response.id;
    }
    return '';
  }

  async deleteListConfig(id: string): Promise<boolean> {
    const result = await api.delete<null>(`listConfig/${id}`);

    if (result) {
      return true;
    }

    return false;
  }

  async saveSetting(listConfigId: string, setting: Setting): Promise<boolean> {
    const result = await api.put<Setting, Setting>(
      `setting/${listConfigId}`,
      setting,
    );

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async addEntityConfig(
    entityConfig: EntityConfig,
  ): Promise<EntityConfig | null> {
    const result = await api.post<EntityConfig, EntityConfig>(
      'entityConfig',
      entityConfig,
    );

    if (result && result.isOk) {
      return result.response;
    }

    return null;
  }

  async updateEntityConfig(
    entityConfig: EntityConfig,
  ): Promise<EntityConfig | null> {
    const result = await api.put<EntityConfig, EntityConfig>(
      `entityConfig/${entityConfig.id}`,
      entityConfig,
    );

    if (result && result.isOk) {
      return result.response;
    }

    return null;
  }

  async getEntityConfigs(): Promise<EntityConfig[]> {
    const result = await api.get<{ entityConfigs: EntityConfig[] }>(
      'entityConfig',
    );

    if (result && result.isOk) {
      return Promise.resolve(result.response.entityConfigs);
    }

    return Promise.reject();
  }

  async deleteEntityConfig(id: number): Promise<boolean> {
    const result = await api.delete<null>(`entityConfig/${id}`);

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async deletePropertyConfig(
    entityConfigId: number,
    id: number,
  ): Promise<boolean> {
    const result = await api.delete<null>(
      `propertyConfig/${entityConfigId}/${id}`,
    );

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async addPropertyConfig(
    propertyConfig: EntityPropertyConfig,
    performDriftCheck: boolean = true,
  ): Promise<Entity.EntityPropertyConfig | null> {
    const {
      id: _id,
      entityConfigId: entityConfigId,
      ...payload
    } = propertyConfig;
    const timeZone = new Date().getTimezoneOffset();
    const result = await api.post<
      Omit<EntityPropertyConfig, 'id' | 'entityConfigId'> & {
        timeZone: number;
        performDriftCheck: boolean;
      },
      EntityPropertyConfig
    >(`propertyConfig/${entityConfigId}`, {
      ...payload,
      timeZone,
      performDriftCheck,
    });

    if (result && result.isOk) {
      return result.response;
    }

    return null;
  }

  async updatePropertyConfig(
    propertyConfig: EntityPropertyConfig,
    performDriftCheck: boolean = true,
  ): Promise<Entity.EntityPropertyConfig | null> {
    const { id, entityConfigId, ...payload } = propertyConfig;
    const timeZone = new Date().getTimezoneOffset();
    const result = await api.put<
      Omit<EntityPropertyConfig, 'id' | 'entityConfigId'> & {
        timeZone: number;
        performDriftCheck: boolean;
      },
      EntityPropertyConfig
    >(`propertyConfig/${entityConfigId}/${id}`, {
      ...payload,
      timeZone,
      performDriftCheck,
    });

    if (result && result.isOk) {
      return result.response;
    }

    return null;
  }

  async setEntityPropertyOrder(
    entityConfigId: number,
    propertyConfigOrder: { id: number; order: number }[],
  ): Promise<boolean> {
    const result = await api.put<{ id: number; order: number }[], null>(
      `propertyConfigOrder/${entityConfigId}`,
      propertyConfigOrder,
    );

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async export(entityConfigIds: number[]): Promise<Entity.Entity[]> {
    const result = await api.post<
      { entityConfigIds: number[] },
      { entities: Entity.Entity[] }
    >('data/export', { entityConfigIds });

    if (result && result.isOk) {
      return result.response.entities;
    }
    return [];
  }

  async clearData(nukedDataTypes: NukedDataType[]): Promise<void> {
    for (const type of nukedDataTypes) {
      const result = await api.delete(`data/${type}`);

      if (!result || !result.isOk) {
        return Promise.reject();
      }
    }

    return Promise.resolve();
  }

  async import(data: ExportDataContents): Promise<boolean> {
    const result = await api.post<
      ExportDataContents & { timeZone: number },
      null
    >('data/import', { ...data, timeZone: new Date().getTimezoneOffset() });

    if (result && result.isOk) {
      return true;
    }
    return false;
  }
}

export const networkStorage = new NetworkStorage();
