export var SSButtonProp;
(function (SSButtonProp) {
    SSButtonProp["TEXT"] = "text";
    SSButtonProp["DISABLED"] = "disabled";
    SSButtonProp["LOADING"] = "loading";
    SSButtonProp["POSITIVE"] = "positive";
    SSButtonProp["NEGATIVE"] = "negative";
    SSButtonProp["CLASS"] = "class";
})(SSButtonProp || (SSButtonProp = {}));
export const ssButtonProps = {
    [SSButtonProp.TEXT]: {
        default: '',
        description: 'Human readable content to be displayed',
        control: 'text',
    },
    [SSButtonProp.DISABLED]: {
        default: false,
        description: 'Whether the field is locked from use',
        control: 'boolean',
    },
    [SSButtonProp.LOADING]: {
        default: false,
        description: 'Whether the button shows loader and is disabled',
        control: 'boolean',
    },
    [SSButtonProp.POSITIVE]: {
        default: false,
        description: 'Whether to style the button in a positive manner',
        control: 'boolean',
    },
    [SSButtonProp.NEGATIVE]: {
        default: false,
        description: 'Whether to style the button in a negative manner',
        control: 'boolean',
    },
    [SSButtonProp.CLASS]: {
        default: '',
        description: 'Any number of custom CSS classes, separated by spaces',
        control: 'text',
    },
};
//# sourceMappingURL=ss-button.models.js.map