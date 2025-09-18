export enum PropertyDataType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

export enum PropertyControlType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  SELECT = "select",
}

export enum PropertyRenderType {
  PLAIN_TEXT = "plainText",
  RICH_TEXT = "richText",
  IMAGE = "image",
  VIDEO = "video",
  HIDDEN = "hidden",
}

export interface PropertyConfig {
  dataType: PropertyDataType;
  controlType: PropertyControlType;
  renderType: PropertyRenderType;
}

/*
export interface PropertyInstance {
  id: 
  //config: PropertyConfig;
}

export const propertyConfig: PropertyConfig[] = [{

}];


export interface EntityConfig {

}

*/
