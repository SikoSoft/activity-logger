import { PropConfigMap, PropTypes } from '@/models/Prop';
import { TextContext } from 'api-spec/models/List';

export enum TextFiltersProp {
  FILTERS = 'filters',
}

export interface TextFiltersProps extends PropTypes {
  [TextFiltersProp.FILTERS]: TextContext[];
}

export const textFiltersProps: PropConfigMap<TextFiltersProps> = {
  [TextFiltersProp.FILTERS]: {
    default: [],
    control: 'text',
    description: 'The list of text filters to display',
  },
};
