import { PropConfigMap, PropTypes } from '../../../models/Prop';

export enum TagInputProp {
  VALUE = 'value',
  ENABLE_SUGGESTIONS = 'enableSuggestions',
}

export interface TagInputProps extends PropTypes {
  [TagInputProp.VALUE]: string;
  [TagInputProp.ENABLE_SUGGESTIONS]: boolean;
}

export const tagInputProps: PropConfigMap<TagInputProps> = {
  [TagInputProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
  [TagInputProp.ENABLE_SUGGESTIONS]: {
    default: true,
    control: 'boolean',
    description: 'Enable tag suggestions',
  },
};
