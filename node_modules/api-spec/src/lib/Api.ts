export interface ApiResponse<ResponseBodyType> {
  status: number;
  response: ResponseBodyType;
}

export type ApiResult<ResponseBodyType> = ApiResponse<ResponseBodyType> | null;

export const emptyResponseCodes = [202, 204];

export interface RequestConfig {
  method: string | undefined;
  headers: HeadersInit;
  body: BodyInit;
}

export interface ApiConfig {
  authToken: string;
  baseUrl: string;
  errorHandler: () => void;
}

export class Api {
  private authToken: string;
  constructor(private config: ApiConfig) {
    this.authToken = config.authToken;
  }

  async httpRequest<ResponseType>(
    path: string,
    config: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    let json: unknown;

    const headers = new Headers(config.headers);

    headers.append("authorization", this.authToken);

    const url = new URL(path, this.config.baseUrl);
    const request = new Request(url, { ...config, headers });

    try {
      const response = await fetch(request);

      if (response.ok && !emptyResponseCodes.includes(response.status)) {
        json = await response.json();
      }

      if (response.status === 403) {
        this.config.errorHandler();
      }

      return {
        status: response.status,
        response: json as ResponseType,
      };
    } catch (error) {
      console.error(`Api encountered an error performing request: ${error}`);
    }

    return null;
  }

  async get<ResponseType>(
    path: string,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "get",
      ...config,
    });
  }

  async post<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
  }

  async put<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
  }

  async delete<ResponseType>(
    path: string,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "delete",
      ...config,
    });
  }

  setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }
}
