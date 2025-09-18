export declare enum PropertyDataType {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean"
}
export declare enum PropertyControlType {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean",
    SELECT = "select"
}
export declare enum PropertyRenderType {
    PLAIN_TEXT = "plainText",
    RICH_TEXT = "richText",
    IMAGE = "image",
    VIDEO = "video",
    HIDDEN = "hidden"
}
export interface PropertyConfig {
    dataType: PropertyDataType;
    controlType: PropertyControlType;
    renderType: PropertyRenderType;
}
