import { StorageItemKey, StorageSchema } from '@/models/Storage';
import { AppState, appState } from '@/state';

export class BrowserStorage implements StorageSchema {
  constructor(state: AppState) {}

  setAuthToken(authToken: string): void {
    localStorage.setItem(StorageItemKey.AUTH_TOKEN_KEY, authToken);
  }

  getAuthToken(): string {
    console.log('browser get auth token');
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
}

export const browserStorage = new BrowserStorage(appState);
