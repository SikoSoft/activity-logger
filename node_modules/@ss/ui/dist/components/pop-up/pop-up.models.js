export var PopUpProp;
(function (PopUpProp) {
    PopUpProp["OPEN"] = "open";
    PopUpProp["CLOSE_BUTTON"] = "closeButton";
    PopUpProp["CLOSE_ON_OUTSIDE_CLICK"] = "closeOnOutsideClick";
    PopUpProp["CLOSE_ON_ESC"] = "closeOnEsc";
})(PopUpProp || (PopUpProp = {}));
export const popUpProps = {
    [PopUpProp.OPEN]: {
        default: false,
        control: 'boolean',
        description: 'Whether the pop-up is open or not',
    },
    [PopUpProp.CLOSE_BUTTON]: {
        default: false,
        control: 'boolean',
        description: 'Whether to show the close button',
    },
    [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: {
        default: false,
        control: 'boolean',
        description: 'Whether to close the pop-up when clicking outside of it',
    },
    [PopUpProp.CLOSE_ON_ESC]: {
        default: false,
        control: 'boolean',
        description: 'Whether to close the pop-up when pressing the ESC key',
    },
};
//# sourceMappingURL=pop-up.models.js.map