import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ThemeManagerProp {
  ACTIVE = 'active',
}

export interface ThemeManagerProps extends PropTypes {
  [ThemeManagerProp.ACTIVE]: string[];
}

export const themeManagerProps: PropConfigMap<ThemeManagerProps> = {
  [ThemeManagerProp.ACTIVE]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The active themes',
  },
};
