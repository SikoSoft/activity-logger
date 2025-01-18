import { v4 as uuidv4 } from 'uuid';
import { ListConfig } from 'api-spec/models/List';
import { Storage } from './Storage';
import {
  AppState,
  appState,
  defaultListFilter,
  defaultListSort,
} from '@/state';
import { api } from './Api';
import { msg } from '@lit/localize';

export class NetworkStorage extends Storage {
  constructor(state: AppState) {
    super(state);
  }

  async getListConfigs(): Promise<ListConfig[]> {
    console.log('NetworkStorage: getListConfigs');
    const result = await api.get<{ listConfigs: ListConfig[] }>('listConfig');

    if (result?.listConfigs) {
      console.log({ listConfigs: result.listConfigs });

      return Promise.resolve(result.listConfigs);
    }

    return Promise.reject();
  }

  async saveListConfig(listConfig: ListConfig): Promise<void> {
    console.log('NetworkStorage: saveListConfig', listConfig);

    await api.post<ListConfig, boolean>('listConfig', listConfig);
  }

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
}

export const networkStorage = new NetworkStorage(appState);
