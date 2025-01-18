import { config } from '../models/Config';
import { storage } from './Storage';

export type ApiResponse<T> = T | null;

export interface RequestConfig {
  method: string | undefined;
  headers: HeadersInit;
  body: BodyInit;
}

export interface ApiConfig {
  authToken: string;
  baseUrl: string;
}

export class Api {
  constructor(private config: ApiConfig) {}

  async httpRequest<ResponseType>(
    path: string,
    config: RequestInit,
  ): Promise<ApiResponse<ResponseType>> {
    let json: unknown;

    const headers = new Headers(config.headers);

    headers.append('authorization', this.config.authToken);

    const url = new URL(path, this.config.baseUrl);
    const request = new Request(url, { ...config, headers });

    try {
      const response = await fetch(request);

      if (response.ok) {
        json = await response.json();
      }

      return json as ResponseType;
    } catch (error) {
      console.error(`Api encountered an error performing request: ${error}`);
    }

    return null;
  }

  async get<ResponseType>(
    path: string,
    config?: RequestInit,
  ): Promise<ApiResponse<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: 'get',
      ...config,
    });
  }

  async post<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit,
  ) {
    return await this.httpRequest<ResponseType>(path, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      ...config,
    });
  }

  async delete<ResponseType>(path: string, config?: RequestInit) {
    return await this.httpRequest<ResponseType>(path, {
      method: 'delete',
      ...config,
    });
  }
}

export const api = new Api({
  authToken: storage.getAuthToken(),
  baseUrl: config.apiUrl,
});
