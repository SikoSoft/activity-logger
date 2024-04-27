export interface Config {
  apiUrl: string;
  perPage: number;
}

export const config: Config = {
  apiUrl: process.env.API_URL || '',
  perPage: 25,
};
