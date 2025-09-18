import { PropConfigMap, PropTypes } from '../../../models/Prop';
export declare enum TagListProp {
    TAGS = "tags"
}
export interface TagListProps extends PropTypes {
    [TagListProp.TAGS]: string[];
}
export declare const tagListProps: PropConfigMap<TagListProps>;
