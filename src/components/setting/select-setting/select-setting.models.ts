import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum SelectSettingProp {
  NAME = 'name',
  VALUE = 'value',
  OPTIONS = 'options',
}

export interface SelectSettingProps extends PropTypes {
  [SelectSettingProp.NAME]: string;
  [SelectSettingProp.VALUE]: string;
  [SelectSettingProp.OPTIONS]: string[];
}

export const selectSettingProps: PropConfigMap<SelectSettingProps> = {
  [SelectSettingProp.NAME]: {
    default: '',
    control: 'text',
    description: 'The name of the setting',
  },
  [SelectSettingProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The value of the setting',
  },
  [SelectSettingProp.OPTIONS]: {
    default: [],
    control: 'text',
    description: 'The options of the setting',
  },
};
