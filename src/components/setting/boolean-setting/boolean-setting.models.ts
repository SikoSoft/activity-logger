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
    control: 'text',
    description: 'The name of the setting',
  },
  [BooleanSettingProp.VALUE]: {
    default: false,
    control: 'boolean',
    description: 'The value of the setting',
  },
};
