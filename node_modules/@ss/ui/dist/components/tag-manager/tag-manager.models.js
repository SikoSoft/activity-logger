export var TagManagerProp;
(function (TagManagerProp) {
    TagManagerProp["VALUE"] = "value";
    TagManagerProp["ENABLE_SUGGESTIONS"] = "enableSuggestions";
})(TagManagerProp || (TagManagerProp = {}));
export const tagManagerProps = {
    [TagManagerProp.VALUE]: {
        default: '',
        control: 'text',
        description: 'The input value',
    },
    [TagManagerProp.ENABLE_SUGGESTIONS]: {
        default: true,
        control: 'boolean',
        description: 'Enable tag suggestions',
    },
};
//# sourceMappingURL=tag-manager.models.js.map