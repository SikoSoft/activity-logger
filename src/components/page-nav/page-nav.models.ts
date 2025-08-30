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
    control: 'text',
    description: 'The active view',
  },
};
