import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';
import {
  BooleanSettingProp,
  BooleanSettingProps,
  booleanSettingProps,
} from '../setting/boolean-setting/boolean-setting.models';
import { Theme } from '@/models/Page';

export enum PageContainerProp {
  THEME = 'theme',
}

export interface PageContainerProps extends PropTypes {
  [PageContainerProp.THEME]: Theme;
}
export const pageContainerProps: PropConfigMap<PageContainerProps> = {
  [PageContainerProp.THEME]: {
    default: Theme.LIGHT,
    control: {
      type: ControlType.SELECT,
      options: ['light', 'dark'],
    },
    description: 'The theme of the page container',
  },
};
