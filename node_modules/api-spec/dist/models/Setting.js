export var ControlType;
(function (ControlType) {
    ControlType["BOOLEAN"] = "boolean";
    ControlType["NUMBER"] = "number";
    ControlType["TEXT"] = "text";
    ControlType["SELECT"] = "select";
})(ControlType || (ControlType = {}));
export var SettingGroup;
(function (SettingGroup) {
    SettingGroup["PAGINATION"] = "pagination";
    SettingGroup["LEXICOLOGY"] = "lexicology";
    SettingGroup["AUTO_COMPLETE"] = "autoComplete";
})(SettingGroup || (SettingGroup = {}));
export var SettingName;
(function (SettingName) {
    SettingName["PAGINATION_TYPE"] = "paginationType";
    SettingName["PAGINATION_PAGE_SIZE"] = "paginationPageSize";
    SettingName["ENTITY_NAME_SINGULAR"] = "entityNameSingular";
    SettingName["ENTITY_NAME_PLURAL"] = "entityNamePlural";
    SettingName["TAG_SUGGESTIONS"] = "tagSuggestions";
})(SettingName || (SettingName = {}));
export var PaginationType;
(function (PaginationType) {
    PaginationType["LAZY"] = "lazy";
    PaginationType["NAVIGATION"] = "navigation";
    PaginationType["MORE_BUTTON"] = "moreButton";
})(PaginationType || (PaginationType = {}));
export var TagSuggestions;
(function (TagSuggestions) {
    TagSuggestions["DISABLED"] = "disabled";
    TagSuggestions["ONLY_IN_LIST"] = "onlyInList";
    TagSuggestions["ALL"] = "all";
})(TagSuggestions || (TagSuggestions = {}));
export const settingsConfig = {
    [SettingName.PAGINATION_TYPE]: {
        name: SettingName.PAGINATION_TYPE,
        value: PaginationType.LAZY,
        control: {
            type: ControlType.SELECT,
            options: Object.values(PaginationType),
        },
        group: SettingGroup.PAGINATION,
    },
    [SettingName.PAGINATION_PAGE_SIZE]: {
        name: SettingName.PAGINATION_PAGE_SIZE,
        value: 10,
        control: { type: ControlType.NUMBER, min: 1, max: 100, step: 1 },
        group: SettingGroup.PAGINATION,
    },
    [SettingName.ENTITY_NAME_SINGULAR]: {
        name: SettingName.ENTITY_NAME_SINGULAR,
        value: "action",
        control: { type: ControlType.TEXT },
        group: SettingGroup.LEXICOLOGY,
    },
    [SettingName.ENTITY_NAME_PLURAL]: {
        name: SettingName.ENTITY_NAME_PLURAL,
        value: "action",
        control: { type: ControlType.TEXT },
        group: SettingGroup.LEXICOLOGY,
    },
    [SettingName.TAG_SUGGESTIONS]: {
        name: SettingName.TAG_SUGGESTIONS,
        value: TagSuggestions.DISABLED,
        control: {
            type: ControlType.SELECT,
            options: Object.values(TagSuggestions),
        },
        group: SettingGroup.AUTO_COMPLETE,
    },
};
export const defaultSettings = {
    [SettingName.PAGINATION_TYPE]: PaginationType.LAZY,
    [SettingName.PAGINATION_PAGE_SIZE]: 10,
    [SettingName.ENTITY_NAME_SINGULAR]: "action",
    [SettingName.ENTITY_NAME_PLURAL]: "actions",
    [SettingName.TAG_SUGGESTIONS]: TagSuggestions.DISABLED,
};
//# sourceMappingURL=Setting.js.map