import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum TabPaneProp {
  TITLE = 'title',
}

export interface TabPaneProps extends PropTypes {
  [TabPaneProp.TITLE]: string;
}

export const tabPaneProps: PropConfigMap<TabPaneProps> = {
  [TabPaneProp.TITLE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The title of the tab pane which is shown in the tab header',
  },
};
