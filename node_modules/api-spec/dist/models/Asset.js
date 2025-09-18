export var PropertyType;
(function (PropertyType) {
    PropertyType["TEXT"] = "text";
    PropertyType["TIME"] = "time";
})(PropertyType || (PropertyType = {}));
const activityConfig = {
    id: 1,
    properties: [],
};
const brainDumpConfig = {
    id: 1,
    properties: [],
};
const gameConfig = {
    id: 1,
    properties: [],
};
const recordConfig = {
    id: 1,
    properties: [{ type: PropertyType.TEXT, name: "title" }],
};
//# sourceMappingURL=Asset.js.map