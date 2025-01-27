import { StorageSchema } from './Storage';
import { AppState, appState } from '@/state';

export class BrowserStorage implements StorageSchema {
  static ACTIVE_LIST_FILTER_KEY = 'listFilter';
  static LIST_FILTERS_KEY = 'listFilters';
  static VIEW_KEY = 'view';
  static ADVANCED_MODE_KEY = 'advancedMode';
  static DEBUG_MODE_KEY = 'debugMode';
  static LIST_CONFIGS_KEY = 'listConfigs';
  static LIST_CONTEXT_MODE = 'listContextMode';
  static LIST_CONTEXT = 'listContext';
  static ACTIVE_LIST_CONFIG_ID = 'activeListConfigId';
  static AUTH_TOKEN_KEY = 'authToken';

  constructor(state: AppState) {}

  setAuthToken(authToken: string): void {
    localStorage.setItem(BrowserStorage.AUTH_TOKEN_KEY, authToken);
  }

  getAuthToken(): string {
    console.log('browser get auth token');
    let authToken = '';
    try {
      const storedAuthToken = localStorage.getItem(
        BrowserStorage.AUTH_TOKEN_KEY,
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
}

export const browserStorage = new BrowserStorage(appState);
