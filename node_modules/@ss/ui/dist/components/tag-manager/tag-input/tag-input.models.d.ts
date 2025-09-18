import { PropConfigMap, PropTypes } from '../../../models/Prop';
export declare enum TagInputProp {
    VALUE = "value",
    ENABLE_SUGGESTIONS = "enableSuggestions"
}
export interface TagInputProps extends PropTypes {
    [TagInputProp.VALUE]: string;
    [TagInputProp.ENABLE_SUGGESTIONS]: boolean;
}
export declare const tagInputProps: PropConfigMap<TagInputProps>;
