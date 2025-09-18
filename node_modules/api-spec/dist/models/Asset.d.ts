export interface Asset {
    id: number;
    properties: Partial<Property>[];
}
export declare enum PropertyType {
    TEXT = "text",
    TIME = "time"
}
export interface PropertyValue {
}
export interface Property {
    type: PropertyType;
    name: string;
    value: PropertyValue;
    minLength: number;
    maxLength: number;
    sortable: boolean;
    initialValue: string;
}
