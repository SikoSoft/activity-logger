import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum BooleanSettingProp {
  NAME = 'name',
  VALUE = 'value',
}

export interface BooleanSettingProps extends PropTypes {
  [BooleanSettingProp.NAME]: string;
  [BooleanSettingProp.VALUE]: boolean;
}

export const booleanSettingProps: PropConfigMap<BooleanSettingProps> = {
  [BooleanSettingProp.NAME]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The name of the setting',
  },
  [BooleanSettingProp.VALUE]: {
    default: false,
    control: {
      type: ControlType.BOOLEAN,
    },
    description: 'The value of the setting',
  },
};
