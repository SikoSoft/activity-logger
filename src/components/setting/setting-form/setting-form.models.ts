import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum SettingFormProp {
  LIST_CONFIG_ID = 'listConfigId',
}

export interface SettingFormProps extends PropTypes {
  [SettingFormProp.LIST_CONFIG_ID]: string;
}

export const settingFormProps: PropConfigMap<SettingFormProps> = {
  [SettingFormProp.LIST_CONFIG_ID]: {
    default: '',
    control: 'text',
    description: 'The ID of the list configuration the settings are for',
  },
};
