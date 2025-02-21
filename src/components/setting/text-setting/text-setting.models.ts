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
    control: 'text',
    description: 'The name of the setting',
  },
  [TextSettingProp.VALUE]: {
    default: '',
    control: 'text',
    description: 'The value of the setting',
  },
};
