/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_BASE_API_URL: string;
  readonly APP_FF_PROPERTIES: boolean;
  readonly APP_ENABLE_NUKE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
