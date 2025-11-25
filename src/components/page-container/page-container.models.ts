import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';
import { ThemeName } from '@/models/Page';

export enum PageContainerProp {
  THEME = 'theme',
}

export interface PageContainerProps extends PropTypes {
  [PageContainerProp.THEME]: string;
}
export const pageContainerProps: PropConfigMap<PageContainerProps> = {
  [PageContainerProp.THEME]: {
    default: ThemeName.LIGHT,
    control: {
      type: ControlType.SELECT,
      options: ['light', 'dark'],
    },
    description: 'The theme of the page container',
  },
};
