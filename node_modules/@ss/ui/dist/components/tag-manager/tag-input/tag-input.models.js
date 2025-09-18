export var TagInputProp;
(function (TagInputProp) {
    TagInputProp["VALUE"] = "value";
    TagInputProp["ENABLE_SUGGESTIONS"] = "enableSuggestions";
})(TagInputProp || (TagInputProp = {}));
export const tagInputProps = {
    [TagInputProp.VALUE]: {
        default: '',
        control: 'text',
        description: 'The input value',
    },
    [TagInputProp.ENABLE_SUGGESTIONS]: {
        default: true,
        control: 'boolean',
        description: 'Enable tag suggestions',
    },
};
//# sourceMappingURL=tag-input.models.js.map