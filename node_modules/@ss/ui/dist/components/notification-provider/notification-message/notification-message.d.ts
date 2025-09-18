import { LitElement } from 'lit';
import { NotificationMessageProp, NotificationMessageProps } from './notification-message.models';
export declare class NotificationMessage extends LitElement {
    static styles: import("lit").CSSResult[];
    [NotificationMessageProp.NOTIFICATION_ID]: NotificationMessageProps[NotificationMessageProp.NOTIFICATION_ID];
    [NotificationMessageProp.MESSAGE]: NotificationMessageProps[NotificationMessageProp.MESSAGE];
    [NotificationMessageProp.TYPE]: NotificationMessageProps[NotificationMessageProp.TYPE];
    [NotificationMessageProp.START_TIME]: NotificationMessageProps[NotificationMessageProp.START_TIME];
    [NotificationMessageProp.MESSAGE_LIFE]: NotificationMessageProps[NotificationMessageProp.MESSAGE_LIFE];
    get classes(): Record<string, boolean>;
    render(): import("lit-html").TemplateResult<1>;
}
