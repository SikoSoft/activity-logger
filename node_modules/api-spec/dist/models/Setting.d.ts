export declare enum ControlType {
    BOOLEAN = "boolean",
    NUMBER = "number",
    TEXT = "text",
    SELECT = "select"
}
export declare enum SettingGroup {
    PAGINATION = "pagination",
    LEXICOLOGY = "lexicology",
    AUTO_COMPLETE = "autoComplete"
}
export interface SettingTypeConfig {
    [ControlType.BOOLEAN]: boolean;
    [ControlType.NUMBER]: number;
    [ControlType.TEXT]: string;
    [ControlType.SELECT]: string;
}
export declare enum SettingName {
    PAGINATION_TYPE = "paginationType",
    PAGINATION_PAGE_SIZE = "paginationPageSize",
    ENTITY_NAME_SINGULAR = "entityNameSingular",
    ENTITY_NAME_PLURAL = "entityNamePlural",
    TAG_SUGGESTIONS = "tagSuggestions"
}
export declare enum PaginationType {
    LAZY = "lazy",
    NAVIGATION = "navigation",
    MORE_BUTTON = "moreButton"
}
export declare enum TagSuggestions {
    DISABLED = "disabled",
    ONLY_IN_LIST = "onlyInList",
    ALL = "all"
}
export type PaginationIndex = keyof typeof PaginationType;
export type PaginationValue = (typeof PaginationType)[PaginationIndex];
export interface BooleanControl {
    type: ControlType.BOOLEAN;
}
export interface NumberControl {
    type: ControlType.NUMBER;
    min?: number;
    max?: number;
    step?: number;
}
export interface TextControl {
    type: ControlType.TEXT;
}
export interface SelectControl {
    type: ControlType.SELECT;
    options: any[];
}
export type Control = BooleanControl | NumberControl | TextControl | SelectControl;
export interface BooleanSettingConfig {
    name: SettingName;
    value: boolean;
    control: BooleanControl;
    group: SettingGroup;
}
export interface NumberSettingConfig {
    name: SettingName;
    value: number;
    control: NumberControl;
    group: SettingGroup;
}
export interface TextSettingConfig {
    name: SettingName;
    value: string;
    control: TextControl | SelectControl;
    group: SettingGroup;
}
export interface PaginationTypeSettingConfig extends TextSettingConfig {
    name: SettingName.PAGINATION_TYPE;
    value: PaginationType;
    control: SelectControl;
    group: SettingGroup.PAGINATION;
}
export interface PaginationPageSizeSettingConfig extends NumberSettingConfig {
    name: SettingName.PAGINATION_PAGE_SIZE;
    value: number;
    control: NumberControl;
    group: SettingGroup.PAGINATION;
}
export interface EntityNameSingularSettingConfig extends TextSettingConfig {
    name: SettingName.ENTITY_NAME_SINGULAR;
    value: string;
    control: TextControl;
    group: SettingGroup.LEXICOLOGY;
}
export interface EntityNamePluralSettingConfig extends TextSettingConfig {
    name: SettingName.ENTITY_NAME_PLURAL;
    value: string;
    control: TextControl;
    group: SettingGroup.LEXICOLOGY;
}
export interface TagSuggestionsSettingConfig extends TextSettingConfig {
    name: SettingName.TAG_SUGGESTIONS;
    value: TagSuggestions;
    control: SelectControl;
    group: SettingGroup.AUTO_COMPLETE;
}
export type SettingConfig = PaginationTypeSettingConfig | PaginationPageSizeSettingConfig | EntityNameSingularSettingConfig | EntityNamePluralSettingConfig | TagSuggestionsSettingConfig;
export type SettingsConfig = {
    [SettingName.PAGINATION_TYPE]: PaginationTypeSettingConfig;
    [SettingName.PAGINATION_PAGE_SIZE]: PaginationPageSizeSettingConfig;
    [SettingName.ENTITY_NAME_SINGULAR]: EntityNameSingularSettingConfig;
    [SettingName.ENTITY_NAME_PLURAL]: EntityNamePluralSettingConfig;
    [SettingName.TAG_SUGGESTIONS]: TagSuggestionsSettingConfig;
};
export declare const settingsConfig: SettingsConfig;
export type Setting = {
    [K in keyof SettingsConfig]: Partial<SettingsConfig[K]> & {
        name: K;
        value: SettingsConfig[K]["value"];
    };
}[keyof SettingsConfig];
export type Settings = {
    [Property in keyof SettingsConfig]: SettingsConfig[Property]["value"];
};
export declare const defaultSettings: Settings;
