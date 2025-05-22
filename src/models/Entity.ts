export interface CommonRenderConfig {
  name: string;
  values: ValueConfig[];
}

export interface TextRenderConfig extends CommonRenderConfig {
  value: TextValueConfig;
}

export interface ImageRenderConfig extends CommonRenderConfig {
  src: TextValueConfig;
  alt: TextValueConfig;
}

export type RenderConfig = TextRenderConfig | ImageRenderConfig;

export interface EntityConfig {
  id: number;
  name: string;
  propertyConfigs: PropertyConfig[];
}

export interface IntValueConfig {
  id: number;
  value: number;
}

export interface TextValueConfig {
  id: number;
  value: string;
}

export interface BooleanValueConfig {
  id: number;
  value: boolean;
}

export type ValueConfig = IntValueConfig | TextValueConfig | BooleanValueConfig;

export interface PropertyConfig {
  id: number;
  name: string;
  prefix: string;
  suffix: string;
  required: number;
  repeat: number;
  allowed: number;
  type: RenderType;
  /*
  renderConfig: RenderConfig;
  valueConfigs: ValueConfig[];
  */
}

export interface Entity {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export enum RenderType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface Entity {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export interface ItemProperty {
  id: number;
  value: unknown[];
}

export interface Item {
  id: number;
  type: number;
  properties: ItemProperty[];
}
