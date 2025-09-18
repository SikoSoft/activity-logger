import { PropConfigMap } from '../../models/Prop';
export declare enum SSButtonProp {
    TEXT = "text",
    DISABLED = "disabled",
    LOADING = "loading",
    POSITIVE = "positive",
    NEGATIVE = "negative",
    CLASS = "class"
}
export interface SSButtonProps {
    [SSButtonProp.TEXT]: string;
    [SSButtonProp.DISABLED]: boolean;
    [SSButtonProp.LOADING]: boolean;
    [SSButtonProp.POSITIVE]: boolean;
    [SSButtonProp.NEGATIVE]: boolean;
    [SSButtonProp.CLASS]: string;
}
export declare const ssButtonProps: PropConfigMap<SSButtonProps>;
