import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum TagManagerProp {
  VALUE = 'value',
  ENABLE_SUGGESTIONS = 'enableSuggestions',
}

export interface TagManagerProps extends PropTypes {
  [TagManagerProp.VALUE]: string;
  [TagManagerProp.ENABLE_SUGGESTIONS]: boolean;
}

export const tagManagerProps: PropConfigMap<TagManagerProps> = {
  [TagManagerProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The input value',
  },
  [TagManagerProp.ENABLE_SUGGESTIONS]: {
    default: true,
    control: 'boolean',
    description: 'Enable tag suggestions',
  },
};
