import { PropConfigMap, PropTypes } from '../../models/Prop';
export declare enum SSLoaderProp {
    PADDED = "padded"
}
export interface SSLoaderProps extends PropTypes {
    [SSLoaderProp.PADDED]: boolean;
}
export declare const ssLoaderProps: PropConfigMap<SSLoaderProps>;
