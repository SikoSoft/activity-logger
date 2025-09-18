import { PropConfigMap, PropTypes } from '@/models/Prop';
export declare enum PopUpProp {
    OPEN = "open",
    CLOSE_BUTTON = "closeButton",
    CLOSE_ON_OUTSIDE_CLICK = "closeOnOutsideClick",
    CLOSE_ON_ESC = "closeOnEsc"
}
export interface PopUpProps extends PropTypes {
    [PopUpProp.OPEN]: boolean;
    [PopUpProp.CLOSE_BUTTON]: boolean;
    [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: boolean;
    [PopUpProp.CLOSE_ON_ESC]: boolean;
}
export declare const popUpProps: PropConfigMap<PopUpProps>;
