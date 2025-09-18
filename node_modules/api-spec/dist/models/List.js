export var ListFilterType;
(function (ListFilterType) {
    ListFilterType["CONTAINS_ONE_OF"] = "containsOneOf";
    ListFilterType["CONTAINS_ALL_OF"] = "containsAllOf";
})(ListFilterType || (ListFilterType = {}));
export var ListFilterTimeType;
(function (ListFilterTimeType) {
    ListFilterTimeType["ALL_TIME"] = "allTime";
    ListFilterTimeType["EXACT_DATE"] = "exactDate";
    ListFilterTimeType["RANGE"] = "range";
})(ListFilterTimeType || (ListFilterTimeType = {}));
export var TextType;
(function (TextType) {
    TextType["CONTAINS"] = "contains";
    TextType["STARTS_WITH"] = "startsWith";
    TextType["ENDS_WITH"] = "endsWith";
    TextType["EQUALS"] = "equals";
})(TextType || (TextType = {}));
export var ListSortProperty;
(function (ListSortProperty) {
    ListSortProperty["OCCURRED_AT"] = "occurredAt";
    ListSortProperty["CREATED_AT"] = "createdAt";
    ListSortProperty["DESC"] = "desc";
})(ListSortProperty || (ListSortProperty = {}));
export var ListSortDirection;
(function (ListSortDirection) {
    ListSortDirection["ASC"] = "asc";
    ListSortDirection["DESC"] = "desc";
})(ListSortDirection || (ListSortDirection = {}));
export var ListContextType;
(function (ListContextType) {
    ListContextType["BEFORE"] = "before";
    ListContextType["AFTER"] = "after";
})(ListContextType || (ListContextType = {}));
export var ListContextUnit;
(function (ListContextUnit) {
    ListContextUnit["MINUTE"] = "minute";
    ListContextUnit["HOUR"] = "hour";
    ListContextUnit["DAY"] = "day";
})(ListContextUnit || (ListContextUnit = {}));
//# sourceMappingURL=List.js.map