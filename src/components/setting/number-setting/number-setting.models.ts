import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum NumberSettingProp {
  NAME = 'name',
  VALUE = 'value',
  MIN = 'min',
  MAX = 'max',
  STEP = 'step',
}

export interface NumberSettingProps extends PropTypes {
  [NumberSettingProp.NAME]: string;
  [NumberSettingProp.VALUE]: number;
  [NumberSettingProp.MIN]: number;
  [NumberSettingProp.MAX]: number;
  [NumberSettingProp.STEP]: number;
}

export const numberSettingProps: PropConfigMap<NumberSettingProps> = {
  [NumberSettingProp.NAME]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The name of the setting',
  },
  [NumberSettingProp.VALUE]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The value of the setting',
  },
  [NumberSettingProp.MIN]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The minimum value of the setting',
  },
  [NumberSettingProp.MAX]: {
    default: 100,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The maximum value of the setting',
  },
  [NumberSettingProp.STEP]: {
    default: 1,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The step value of the setting',
  },
};
