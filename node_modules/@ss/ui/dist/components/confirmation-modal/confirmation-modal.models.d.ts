import { PropConfigMap, PropTypes } from '@/models/Prop';
export declare enum ConfirmationModalProp {
    OPEN = "open",
    MESSAGE = "message",
    ACCEPT_TEXT = "acceptText",
    DECLINE_TEXT = "declineText"
}
export interface ConfirmationModalProps extends PropTypes {
    [ConfirmationModalProp.OPEN]: boolean;
    [ConfirmationModalProp.MESSAGE]: string;
    [ConfirmationModalProp.ACCEPT_TEXT]: string;
    [ConfirmationModalProp.DECLINE_TEXT]: string;
}
export declare const confirmationModalProps: PropConfigMap<ConfirmationModalProps>;
