export var NotificationProviderProp;
(function (NotificationProviderProp) {
    NotificationProviderProp["MESSAGE_LIFE"] = "messageLife";
    NotificationProviderProp["TOP"] = "top";
    NotificationProviderProp["BOTTOM"] = "bottom";
})(NotificationProviderProp || (NotificationProviderProp = {}));
export const notificationProviderProps = {
    [NotificationProviderProp.MESSAGE_LIFE]: {
        default: 5000,
        control: 'number',
        description: 'The time in milliseconds that a message will be displayed',
    },
    [NotificationProviderProp.TOP]: {
        default: false,
        control: 'boolean',
        description: 'Whether the notification provider is at the top of the screen',
    },
    [NotificationProviderProp.BOTTOM]: {
        default: false,
        control: 'boolean',
        description: 'Whether the notification provider is at the bottom of the screen',
    },
};
export var NotificationType;
(function (NotificationType) {
    NotificationType["INFO"] = "info";
    NotificationType["SUCCESS"] = "success";
    NotificationType["WARNING"] = "warning";
    NotificationType["ERROR"] = "error";
})(NotificationType || (NotificationType = {}));
export var NotificationSide;
(function (NotificationSide) {
    NotificationSide["TOP"] = "top";
    NotificationSide["BOTTOM"] = "bottom";
})(NotificationSide || (NotificationSide = {}));
//# sourceMappingURL=notification-provider.models.js.map