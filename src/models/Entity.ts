export interface CommonRenderConfig {
  id: number;
  name: string;
}

export interface TextRenderConfig extends CommonRenderConfig {
  value: string;
}

export interface ImageRenderConfig extends CommonRenderConfig {
  src: string;
  alt: string;
}

export type RenderConfig = TextRenderConfig | ImageRenderConfig;

export interface EntityConfig {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export interface PropertyConfig {
  id: number;
  name: string;
  renderConfig: RenderConfig;
}
