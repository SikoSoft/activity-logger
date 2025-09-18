export interface ApiResponse<ResponseBodyType> {
    status: number;
    response: ResponseBodyType;
}
export type ApiResult<ResponseBodyType> = ApiResponse<ResponseBodyType> | null;
export declare const emptyResponseCodes: number[];
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
export declare class Api {
    private config;
    private authToken;
    constructor(config: ApiConfig);
    httpRequest<ResponseType>(path: string, config: RequestInit): Promise<ApiResult<ResponseType>>;
    get<ResponseType>(path: string, config?: RequestInit): Promise<ApiResult<ResponseType>>;
    post<RequestType, ResponseType>(path: string, body: RequestType, config?: RequestInit): Promise<ApiResult<ResponseType>>;
    put<RequestType, ResponseType>(path: string, body: RequestType, config?: RequestInit): Promise<ApiResult<ResponseType>>;
    delete<ResponseType>(path: string, config?: RequestInit): Promise<ApiResult<ResponseType>>;
    setAuthToken(authToken: string): void;
}
