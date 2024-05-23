export interface Config {
  apiUrl: string;
  perPage: number;
}

export const config: Config = {
  apiUrl: import.meta.env.APP_BASE_API_URL || '',
  perPage: 25,
};
