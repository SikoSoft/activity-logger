import { PropConfigMap, PropTypes } from '../../../models/Prop';

export enum TagListProp {
  TAGS = 'tags',
}

export interface TagListProps extends PropTypes {
  [TagListProp.TAGS]: string[];
}

export const tagListProps: PropConfigMap<TagListProps> = {
  [TagListProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The list of tags',
  },
};
