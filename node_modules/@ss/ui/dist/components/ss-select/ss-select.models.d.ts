import { PropConfigMap, PropTypes } from '../../models/Prop';
export interface SelectOption {
    value: string;
    label: string;
}
export declare enum SSSelectProp {
    OPTIONS = "options",
    SELECTED = "selected"
}
export interface SSSelectProps extends PropTypes {
    [SSSelectProp.OPTIONS]: SelectOption[];
    [SSSelectProp.SELECTED]: string;
}
export declare const ssSelectProps: PropConfigMap<SSSelectProps>;
