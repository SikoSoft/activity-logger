import { ListConfig } from 'api-spec/models/List';
import { api } from './Api';
import { StorageSchema } from '@/models/Storage';
import { msg } from '@lit/localize';

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
    const result = api.post<{ name: string }, { id: string }>('listConfig', {
      name: msg('Config name'),
    });
    return '';
  }

  async deleteListConfig(id: string): Promise<boolean> {
    const result = api.delete<unknown>(`listConfig/${id}`);

    return Promise.resolve(true);
  }
}

export const networkStorage = new NetworkStorage();
