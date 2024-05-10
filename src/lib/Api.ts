import { config, Config } from '../models/Config';

export type ApiResponse<T> = T | null;

export interface RequestConfig {
  method: string | undefined;
  headers: HeadersInit;
  body: BodyInit;
}

export class Api {
  constructor(private config: Config) {}

  async httpRequest<ResponseType>(
    path: string,
    config: RequestInit
  ): Promise<ApiResponse<ResponseType>> {
    console.log('httpRequest', path);
    let json: unknown;

    const headers = new Headers(config.headers);

    const url = new URL(path, this.config.apiUrl);
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
    config?: RequestInit
  ): Promise<ApiResponse<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: 'get',
      ...config,
    });
  }

  async post<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit
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

export const api = new Api(config);
