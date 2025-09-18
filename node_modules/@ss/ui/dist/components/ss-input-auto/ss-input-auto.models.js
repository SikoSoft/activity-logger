export var SSInputAutoProp;
(function (SSInputAutoProp) {
    SSInputAutoProp["INPUT"] = "input";
    SSInputAutoProp["MAX_MATCHES"] = "maxMatches";
    SSInputAutoProp["MIN_INPUT"] = "minInput";
    SSInputAutoProp["SUGGESTIONS"] = "suggestions";
})(SSInputAutoProp || (SSInputAutoProp = {}));
export const ssInputAutoProps = {
    [SSInputAutoProp.INPUT]: {
        default: '',
        control: 'text',
        description: 'The input value',
    },
    [SSInputAutoProp.MAX_MATCHES]: {
        default: 5,
        control: 'number',
        description: 'The maximum number of suggestions to display',
    },
    [SSInputAutoProp.MIN_INPUT]: {
        default: 1,
        control: 'number',
        description: 'The minimum number of characters to start showing suggestions',
    },
    [SSInputAutoProp.SUGGESTIONS]: {
        default: [],
        control: 'text',
        description: 'The list of suggestions to display',
    },
};
//# sourceMappingURL=ss-input-auto.models.js.map