export var DataType;
(function (DataType) {
    DataType["BOOLEAN"] = "boolean";
    DataType["IMAGE"] = "image";
    DataType["INT"] = "int";
    DataType["LONG_TEXT"] = "longText";
    DataType["SHORT_TEXT"] = "shortText";
})(DataType || (DataType = {}));
export var RenderType;
(function (RenderType) {
    RenderType["TEXT"] = "text";
    RenderType["IMAGE"] = "image";
    RenderType["NUMBER"] = "number";
    RenderType["HIDDEN"] = "hidden";
})(RenderType || (RenderType = {}));
export const defaultEntityPropertyConfig = {
    entityConfigId: 0,
    id: 0,
    userId: "",
    name: "",
    prefix: "",
    suffix: "",
    required: 0,
    repeat: 1,
    allowed: 1,
    dataType: DataType.SHORT_TEXT,
    renderType: RenderType.TEXT,
    defaultValue: "",
};
export const defaultEntityConfig = {
    id: 0,
    userId: "",
    name: "",
    description: "",
    properties: [],
};
//# sourceMappingURL=Entity.js.map