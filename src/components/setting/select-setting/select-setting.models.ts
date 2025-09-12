import { ControlType } from '@/models/Control';
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
    control: {
      type: ControlType.TEXT,
    },
    description: 'The name of the setting',
  },
  [SelectSettingProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the setting',
  },
  [SelectSettingProp.OPTIONS]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The options of the setting',
  },
};
