import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum TagManagerProp {
  TAGS = 'tags',
  VALUE = 'value',
}

export interface TagManagerProps extends PropTypes {
  [TagManagerProp.TAGS]: string[];
  [TagManagerProp.VALUE]: string;
}

export const tagManagerProps: PropConfigMap<TagManagerProps> = {
  [TagManagerProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The list of tags',
  },
  [TagManagerProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
};
