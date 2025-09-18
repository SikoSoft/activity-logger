import { PropConfigMap, PropTypes } from '../../models/Prop';
export declare enum SSCollapsableProp {
    TITLE = "title",
    OPEN = "open",
    PANEL_ID = "panelId"
}
export interface SSCollapsableProps extends PropTypes {
    [SSCollapsableProp.TITLE]: string;
    [SSCollapsableProp.OPEN]: boolean;
    [SSCollapsableProp.PANEL_ID]: string;
}
export declare const ssCollapsableProps: PropConfigMap<SSCollapsableProps>;
