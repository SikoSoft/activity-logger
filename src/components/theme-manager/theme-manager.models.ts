import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ThemeManagerProp {
  THEMES = 'themes',
}

export interface ThemeManagerProps extends PropTypes {
  [ThemeManagerProp.THEMES]: string[];
}

export const themeManagerProps: PropConfigMap<ThemeManagerProps> = {
  [ThemeManagerProp.THEMES]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The available themes',
  },
};
