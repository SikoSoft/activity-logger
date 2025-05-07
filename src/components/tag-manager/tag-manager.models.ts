import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum TagManagerProp {
  VALUE = 'value',
}

export interface TagManagerProps extends PropTypes {
  [TagManagerProp.VALUE]: string;
}

export const tagManagerProps: PropConfigMap<TagManagerProps> = {
  [TagManagerProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
};
