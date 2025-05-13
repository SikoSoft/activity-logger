export enum PropertyDataType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export enum PropertyControlType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
}

export enum PropertyRenderType {
  PLAIN_TEXT = 'plainText',
  RICH_TEXT = 'richText',
  IMAGE = 'image',
  VIDEO = 'video',
  HIDDEN = 'hidden',
}

export interface DataTypeMap {
  [PropertyDataType.TEXT]: string;
  [PropertyDataType.NUMBER]: number;
  [PropertyDataType.BOOLEAN]: boolean;
}

/*
export enum PropertyType {
  TEXT = 'text',
  NUMBER = 'number',
}
*/

/*
export interface PropertyDataType {
  [PropertyType.TEXT]: string;
  [PropertyType.NUMBER]: number;
}
*/

export interface CommonPropertyConfig {
  id: number;
  dataType: PropertyDataType;
  controlType: PropertyControlType;
  renderType: PropertyRenderType;
  name: string;
  repeat: number;
  min: number;
  max: number;
  defaultValue: DataTypeMap[PropertyDataType];
}

export interface NumberPropertyConfig extends CommonPropertyConfig {
  dataType: PropertyDataType.NUMBER;
  controlType: PropertyControlType.NUMBER;
  defaultValue: number;
}

export interface TextPropertyConfig extends CommonPropertyConfig {
  dataType: PropertyDataType.TEXT;
  controlType: PropertyControlType.TEXT;
  defaultValue: string;
}

export interface BooleanPropertyConfig extends CommonPropertyConfig {
  dataType: PropertyDataType.BOOLEAN;
  controlType: PropertyControlType.BOOLEAN;
  defaultValue: boolean;
}

export type PropertyConfig =
  | NumberPropertyConfig
  | TextPropertyConfig
  | BooleanPropertyConfig;

export const propertyConfigs: PropertyConfig[] = [
  {
    id: 1,
    name: 'text',
    dataType: PropertyDataType.TEXT,
    controlType: PropertyControlType.TEXT,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: '',
  },
  {
    id: 2,
    name: 'reps',
    dataType: PropertyDataType.NUMBER,
    controlType: PropertyControlType.NUMBER,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: 0,
  },
];

export interface Property {
  propertyId: number;
  value: DataTypeMap[PropertyDataType];
}

export const defaultEntityType = 1;

export interface EntityConfig {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export const entityConfigs: EntityConfig[] = [
  { id: 1, name: 'food', properties: [] },
  { id: 2, name: 'exercise', properties: [] },
];
