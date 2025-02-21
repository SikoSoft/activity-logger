import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum SettingFormProp {
  NAME = 'name',
  SETTINGS = 'settings',
}

export interface SettingFormProps extends PropTypes {
  [SettingFormProp.NAME]: string;
  [SettingFormProp.SETTINGS]: string[];
}

export const settingFormProps: PropConfigMap<SettingFormProps> = {
  [SettingFormProp.NAME]: {
    default: '',
    control: 'text',
    description: 'The name of the setting',
  },
  [SettingFormProp.SETTINGS]: {
    default: [],
    control: 'text',
    description: 'The settings of the setting',
  },
};
