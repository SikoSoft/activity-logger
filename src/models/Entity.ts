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

export interface EntityPropertyConfig {
  propertyId: number;
  repeat: number;
  allowed: number;
  required: number;
}

export const defaultEntityPropertyConfig: EntityPropertyConfig = {
  propertyId: 0,
  repeat: 1,
  allowed: 1,
  required: 0,
};

export interface EntityConfig {
  id: number;
  name: string;
  properties: EntityPropertyConfig[];
}

export const defaultEntityConfig: EntityConfig = {
  id: 0,
  name: '',
  properties: [],
};

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
  renderType: RenderType;
  //renderConfig: RenderConfig;
  // valueConfigs: ValueConfig[];
}

export interface Entity {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export enum DataType {
  BOOLEAN = 'boolean',
  IMAGE = 'image',
  INT = 'int',
  LONG_TEXT = 'longText',
  SHORT_TEXT = 'shortText',
}

export enum RenderType {
  TEXT = 'text',
  IMAGE = 'image',
  NUMBER = 'number',
  HIDDEN = 'hidden',
}

export interface Entity {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export interface CommonProperty {
  id: number;
  propertyId: number;
}

export interface TextProperty extends CommonProperty {
  value: string;
}

export interface ImageProperty extends CommonProperty {
  value: {
    src: string;
    alt: string;
  };
}

export type ItemProperty = TextProperty | ImageProperty;

export interface Item {
  id: number;
  type: number;
  properties: ItemProperty[];
}

export interface EntityItem {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}
