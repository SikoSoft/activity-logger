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
  valuePrefix: string;
  valueSuffix: string;
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
    name: 'weight',
    dataType: PropertyDataType.NUMBER,
    controlType: PropertyControlType.NUMBER,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: 0,
    valuePrefix: '',
    valueSuffix: 'kg',
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
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 3,
    name: 'image',
    dataType: PropertyDataType.TEXT,
    controlType: PropertyControlType.TEXT,
    renderType: PropertyRenderType.IMAGE,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: '',
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 4,
    name: 'hidden',
    dataType: PropertyDataType.BOOLEAN,
    controlType: PropertyControlType.BOOLEAN,
    renderType: PropertyRenderType.HIDDEN,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: false,
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 5,
    name: 'title',
    dataType: PropertyDataType.TEXT,
    controlType: PropertyControlType.TEXT,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: '',
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 6,
    name: 'artist',
    dataType: PropertyDataType.TEXT,
    controlType: PropertyControlType.TEXT,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: '',
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 7,
    name: 'year',
    dataType: PropertyDataType.NUMBER,
    controlType: PropertyControlType.NUMBER,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: 1982,
    valuePrefix: '',
    valueSuffix: '',
  },
  {
    id: 8,
    name: 'platform',
    dataType: PropertyDataType.TEXT,
    controlType: PropertyControlType.TEXT,
    renderType: PropertyRenderType.PLAIN_TEXT,
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: '',
    valuePrefix: '',
    valueSuffix: 's',
  },
];

export const propertyConfig = {
  id: 1,
  name: 'weight',
  controlType: PropertyControlType.NUMBER,
  renderType: PropertyRenderType.PLAIN_TEXT,
  repeat: 1,
  min: 1,
  max: 1,
  defaultValue: 0,
  valuePrefix: '',
  valueSuffix: 'kg',
};

export interface Property {
  propertyId: number;
  value: DataTypeMap[PropertyDataType];
}

export const defaultEntityType = 2;

export interface EntityConfig {
  id: number;
  name: string;
  properties: PropertyConfig[];
}

export const defaultProperties: Property[] = [
  { propertyId: 2, value: 20 },
  { propertyId: 1, value: 100 },
  {
    propertyId: 3,
    value: 'https://m.media-amazon.com/images/I/81aRr8wQi4L._AC_UL320_.jpg',
  },
  { propertyId: 4, value: false },
];

export const propertyConfigById = (id: number): PropertyConfig | undefined => {
  return propertyConfigs.find(propertyConfig => propertyConfig.id === id);
};
