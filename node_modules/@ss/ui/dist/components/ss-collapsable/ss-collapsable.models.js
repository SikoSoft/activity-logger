export var SSCollapsableProp;
(function (SSCollapsableProp) {
    SSCollapsableProp["TITLE"] = "title";
    SSCollapsableProp["OPEN"] = "open";
    SSCollapsableProp["PANEL_ID"] = "panelId";
})(SSCollapsableProp || (SSCollapsableProp = {}));
export const ssCollapsableProps = {
    [SSCollapsableProp.TITLE]: {
        default: '',
        description: 'The heading in which is always displayed',
        control: 'text',
    },
    [SSCollapsableProp.OPEN]: {
        default: false,
        description: 'Whether the content is in opened state',
        control: 'boolean',
    },
    [SSCollapsableProp.PANEL_ID]: {
        default: '',
        description: 'The unique identifier for the panel',
        control: 'text',
    },
};
//# sourceMappingURL=ss-collapsable.models.js.map