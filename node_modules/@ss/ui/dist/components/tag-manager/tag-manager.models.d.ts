import { PropConfigMap, PropTypes } from '../../models/Prop';
export declare enum TagManagerProp {
    VALUE = "value",
    ENABLE_SUGGESTIONS = "enableSuggestions"
}
export interface TagManagerProps extends PropTypes {
    [TagManagerProp.VALUE]: string;
    [TagManagerProp.ENABLE_SUGGESTIONS]: boolean;
}
export declare const tagManagerProps: PropConfigMap<TagManagerProps>;
