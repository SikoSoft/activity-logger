import { ListConfig } from 'api-spec/models/List';
import { api } from './Api';
import { StorageSchema } from '@/models/Storage';
import { msg } from '@lit/localize';
import { Setting } from 'api-spec/models/Setting';
import { EntityConfig, EntityPropertyConfig } from 'api-spec/models/Entity';

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

  async addListConfig(): Promise<string> {
    const result = await api.post<{ name: string }, { id: string }>(
      'listConfig',
      {
        name: msg('Config name'),
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

  async addEntityConfig(entityConfig: EntityConfig): Promise<boolean> {
    const result = await api.post<EntityConfig, EntityConfig>(
      'entityConfig',
      entityConfig,
    );

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async updateEntityConfig(entityConfig: EntityConfig): Promise<boolean> {
    const result = await api.put<EntityConfig, EntityConfig>(
      `entityConfig/${entityConfig.id}`,
      entityConfig,
    );

    if (result && result.isOk) {
      return true;
    }

    return false;
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

  async deletePropertyConfig(id: number): Promise<boolean> {
    console.log('Deleting property config', id);
    const result = await api.delete<null>(`propertyConfig/${id}`);

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async addPropertyConfig(
    propertyConfig: EntityPropertyConfig,
  ): Promise<boolean> {
    console.log('Adding property config', propertyConfig);
    const { id, entityConfigId, ...payload } = propertyConfig;

    const result = await api.post<
      Omit<EntityPropertyConfig, 'id' | 'entityConfigId'>,
      EntityPropertyConfig
    >(`propertyConfig/${entityConfigId}`, payload);

    if (result && result.isOk) {
      return true;
    }

    return false;
  }

  async updatePropertyConfig(
    propertyConfig: EntityPropertyConfig,
  ): Promise<boolean> {
    const { id, entityConfigId, ...payload } = propertyConfig;
    const result = await api.put<
      Omit<EntityPropertyConfig, 'id' | 'entityConfigId'>,
      EntityPropertyConfig
    >(`propertyConfig/${entityConfigId}/${id}`, payload);

    if (result && result.isOk) {
      return true;
    }

    return false;
  }
}

export const networkStorage = new NetworkStorage();
