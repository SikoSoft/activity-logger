export var SSToggleProp;
(function (SSToggleProp) {
    SSToggleProp["ON"] = "on";
    SSToggleProp["HIGHLIGHT_TIME"] = "highlightTime";
})(SSToggleProp || (SSToggleProp = {}));
export const ssToggleProps = {
    [SSToggleProp.ON]: {
        default: false,
        description: 'Whether the toggle is in enabled state',
        control: 'boolean',
    },
    [SSToggleProp.HIGHLIGHT_TIME]: {
        default: 350,
        description: 'Time in milliseconds to highlight the toggle when clicked',
        control: 'number',
    },
};
//# sourceMappingURL=ss-toggle.models.js.map