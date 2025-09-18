export var IconName;
(function (IconName) {
    IconName["PROFILE"] = "profile";
    IconName["ARROW_CIRCLE_LEFT"] = "arrowCircleLeft";
    IconName["ARROW_CIRCLE_RIGHT"] = "arrowCircleRight";
    IconName["VALID_CIRCLE"] = "validCircle";
    IconName["INVALID_CIRCLE"] = "invalidCircle";
    IconName["GEAR"] = "gear";
    IconName["DELETE"] = "delete";
})(IconName || (IconName = {}));
export var SSIconProp;
(function (SSIconProp) {
    SSIconProp["NAME"] = "name";
    SSIconProp["SIZE"] = "size";
    SSIconProp["COLOR"] = "color";
})(SSIconProp || (SSIconProp = {}));
export const ssIconProps = {
    [SSIconProp.NAME]: {
        default: IconName.PROFILE,
        description: 'The name of the icon to display',
        control: 'text',
    },
    [SSIconProp.SIZE]: {
        default: 24,
        description: 'The size of the icon in pixels',
        control: 'number',
    },
    [SSIconProp.COLOR]: {
        default: '#000',
        description: 'The color of the icon',
        control: 'text',
    },
};
/*
export type IconMap = Record<IconName, string>;
export const iconMap: IconMap = {
  [IconName.PROFILE]:
    'M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z',
};
*/
//# sourceMappingURL=ss-icon.models.js.map