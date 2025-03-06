import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum TagInputProp {
  VALUE = 'value',
}

export interface TagInputProps extends PropTypes {
  [TagInputProp.VALUE]: string;
}

export const tagInputProps: PropConfigMap<TagInputProps> = {
  [TagInputProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
};
