export declare enum DataType {
    BOOLEAN = "boolean",
    IMAGE = "image",
    INT = "int",
    LONG_TEXT = "longText",
    SHORT_TEXT = "shortText"
}
export declare enum RenderType {
    TEXT = "text",
    IMAGE = "image",
    NUMBER = "number",
    HIDDEN = "hidden"
}
export type BooleanDataValue = boolean;
export type IntDataValue = number;
export type ImageDataValue = {
    src: string;
    alt: string;
};
export type LongTextDataValue = string;
export type ShortTextDataValue = string;
export type PropertyDataValue = BooleanDataValue | IntDataValue | ImageDataValue | LongTextDataValue | ShortTextDataValue;
export interface CommonEntityPropertyConfig {
    entityConfigId: number;
    id: number;
    userId: string;
    name: string;
    prefix: string;
    suffix: string;
    required: number;
    repeat: number;
    allowed: number;
    renderType: RenderType;
}
export interface BooleanDataTypedValue {
    dataType: DataType.BOOLEAN;
    defaultValue: BooleanDataValue;
}
export interface IntDataTypedValue {
    dataType: DataType.INT;
    defaultValue: IntDataValue;
}
export interface ImageDataTypedValue {
    dataType: DataType.IMAGE;
    defaultValue: ImageDataValue;
}
export interface LongTextDataTypedValue {
    dataType: DataType.LONG_TEXT;
    defaultValue: LongTextDataValue;
}
export interface ShortTextDataTypedValue {
    dataType: DataType.SHORT_TEXT;
    defaultValue: ShortTextDataValue;
}
export type DataTypedValue = BooleanDataTypedValue | IntDataTypedValue | ImageDataTypedValue | LongTextDataTypedValue | ShortTextDataTypedValue;
export interface BooleanEntityPropertyConfig extends CommonEntityPropertyConfig, BooleanDataTypedValue {
}
export interface IntEntityPropertyConfig extends CommonEntityPropertyConfig, IntDataTypedValue {
}
export interface ImageEntityPropertyConfig extends CommonEntityPropertyConfig, ImageDataTypedValue {
}
export interface LongTextEntityPropertyConfig extends CommonEntityPropertyConfig, LongTextDataTypedValue {
}
export interface ShortTextEntityPropertyConfig extends CommonEntityPropertyConfig, ShortTextDataTypedValue {
}
export type EntityPropertyConfig = BooleanEntityPropertyConfig | IntEntityPropertyConfig | ImageEntityPropertyConfig | LongTextEntityPropertyConfig | ShortTextEntityPropertyConfig;
export declare const defaultEntityPropertyConfig: EntityPropertyConfig;
export interface EntityConfig {
    id: number;
    userId: string;
    name: string;
    description: string;
    properties: EntityPropertyConfig[];
}
export declare const defaultEntityConfig: EntityConfig;
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
}
export interface Entity {
    id: number;
    name: string;
    properties: PropertyConfig[];
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
