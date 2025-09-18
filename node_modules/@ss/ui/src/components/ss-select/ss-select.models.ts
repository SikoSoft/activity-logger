import { PropConfigMap, PropTypes } from '../../models/Prop';

export interface SelectOption {
  value: string;
  label: string;
}

export enum SSSelectProp {
  OPTIONS = 'options',
  SELECTED = 'selected',
}

export interface SSSelectProps extends PropTypes {
  [SSSelectProp.OPTIONS]: SelectOption[];
  [SSSelectProp.SELECTED]: string;
}

export const ssSelectProps: PropConfigMap<SSSelectProps> = {
  [SSSelectProp.OPTIONS]: {
    default: [],
    description: 'The options to display in the select',
    control: 'text',
  },
  [SSSelectProp.SELECTED]: {
    default: '',
    description: 'The value of the selected option',
    control: 'text',
  },
};
