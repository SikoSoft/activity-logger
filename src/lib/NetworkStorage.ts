import { ListConfig } from 'api-spec/models/List';
import { AppState, appState } from '@/state';
import { api } from './Api';
import { StorageSchema } from '@/models/Storage';

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

    await api.post<ListConfig, boolean>('listConfig', listConfig);
  }

  /*
  async addListConfig(): Promise<string> {
    console.log('NetworkStorage: addListConfig');
    const id = uuidv4();
    const listConfig = {
      id,
      name: msg('Config Name'),
      filter: defaultListFilter,
      sort: defaultListSort,
    };
    const listConfigs = await this.getListConfigs();
    localStorage.setItem(
      Storage.LIST_CONFIGS_KEY,
      JSON.stringify([...listConfigs, listConfig]),
    );
    return Promise.resolve(id);
  }

  async deleteListConfig(id: string): Promise<boolean> {
    console.log('NetworkStorage: deleteListConfig', id);

    return Promise.resolve(true);
  }
    */
}

export const networkStorage = new NetworkStorage(appState);
