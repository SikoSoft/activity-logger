import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum TextSettingProp {
  NAME = 'name',
  VALUE = 'value',
}

export interface TextSettingProps extends PropTypes {
  [TextSettingProp.NAME]: string;
  [TextSettingProp.VALUE]: string;
}

export const textSettingProps: PropConfigMap<TextSettingProps> = {
  [TextSettingProp.NAME]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The name of the setting',
  },
  [TextSettingProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the setting',
  },
};
