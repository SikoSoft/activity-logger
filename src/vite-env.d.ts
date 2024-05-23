/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
