export enum PropertyType {
  TEXT = 'text',
  NUMBER = 'number',
}

export interface PropertyDataType {
  [PropertyType.TEXT]: string;
  [PropertyType.NUMBER]: number;
}

export const propertyTypes = [
  { id: 1, name: 'text', type: PropertyType.TEXT },
  { id: 2, name: 'number', type: PropertyType.NUMBER },
];

export interface Property {
  id: number;
  type: PropertyType;
  name: string;
  repeat: number;
  min: number;
  max: number;
  defaultValue: PropertyDataType[PropertyType];
}

export const properties: Property[] = [
  {
    id: 1,
    type: PropertyType.NUMBER,
    name: 'reps',
    repeat: 1,
    min: 1,
    max: 1,
    defaultValue: 1,
  },
];

export const defaultEntityType = 1;

export interface Entity {
  id: number;
  name: string;
  properties: Property[];
}

export const entityConfigs = [
  { id: 1, name: 'food', properties: [] },
  { id: 2, name: 'exercise', properties: [] },
];
