import { PropConfigMap, PropTypes } from '../../models/Prop';
export declare enum SSToggleProp {
    ON = "on",
    HIGHLIGHT_TIME = "highlightTime"
}
export interface SSToggleProps extends PropTypes {
    [SSToggleProp.ON]: boolean;
    [SSToggleProp.HIGHLIGHT_TIME]: number;
}
export declare const ssToggleProps: PropConfigMap<SSToggleProps>;
