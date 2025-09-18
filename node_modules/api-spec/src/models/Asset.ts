export interface Asset {
  id: number;
  properties: Partial<Property>[];
}

export enum PropertyType {
  TEXT = "text",
  TIME = "time",
}

export interface PropertyValue {}

export interface Property {
  type: PropertyType;
  name: string;
  value: PropertyValue;
  minLength: number;
  maxLength: number;
  sortable: boolean;
  initialValue: string;
}

const activityConfig: Asset = {
  id: 1,
  properties: [],
};

const brainDumpConfig: Asset = {
  id: 1,
  properties: [],
};

const gameConfig: Asset = {
  id: 1,
  properties: [],
};

const recordConfig: Asset = {
  id: 1,
  properties: [{ type: PropertyType.TEXT, name: "title" }],
};
