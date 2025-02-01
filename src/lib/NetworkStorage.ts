import { v4 as uuidv4 } from 'uuid';
import { ListConfig } from 'api-spec/models/List';
import {
  AppState,
  appState,
  defaultListFilter,
  defaultListSort,
} from '@/state';
import { api } from './Api';
import { StorageItemKey, StorageSchema } from '@/models/Storage';
import { msg } from '@lit/localize';

export class NetworkStorage implements StorageSchema {
  constructor(state: AppState) {}

  async getListConfigs(): Promise<ListConfig[]> {
    console.log('NetworkStorage: getListConfigs');
    const result = await api.get<{ listConfigs: ListConfig[] }>('listConfig');

    if (result) {
      console.log({ listConfigs: result.response.listConfigs });

      return Promise.resolve(result.response.listConfigs);
    }

    return Promise.reject();
  }

  async saveListConfig(listConfig: ListConfig): Promise<void> {
    console.log('NetworkStorage: saveListConfig', listConfig);

    await api.put<ListConfig, ListConfig>(
      `listConfig/${listConfig.id}`,
      listConfig,
    );
  }

  async addListConfig(): Promise<string> {
    console.log('NetworkStorage: addListConfig');
    const result = api.post<{ name: string }, { id: string }>('listConfig', {
      name: msg('Config name'),
    });
    /*
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
    return Promise.resolve(id);
    */
    return '';
  }

  async deleteListConfig(id: string): Promise<boolean> {
    console.log('NetworkStorage: deleteListConfig', id);

    const result = api.delete<unknown>(`listConfig/${id}`);
    console.log(result);

    return Promise.resolve(true);
  }
}

export const networkStorage = new NetworkStorage(appState);
