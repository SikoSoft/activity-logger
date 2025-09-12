import { ControlType } from '@/models/Control';
import { PageView } from '@/models/Page';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum PageNavProp {
  ACTIVE = 'active',
}

export interface PageNavProps extends PropTypes {
  [PageNavProp.ACTIVE]: PageView;
}

export const pageNavProps: PropConfigMap<PageNavProps> = {
  [PageNavProp.ACTIVE]: {
    default: PageView.INPUT,
    control: {
      type: ControlType.TEXT,
    },
    description: 'The active view',
  },
};
