import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export interface Tab {
  title: string;
  content: HTMLElement;
}

export enum TabContainerProp {
  INDEX = 'index',
  PANE_ID = 'paneId',
}

export interface TabContainerProps extends PropTypes {
  [TabContainerProp.INDEX]: number;
  [TabContainerProp.PANE_ID]: string;
}

export const tabContainerProps: PropConfigMap<TabContainerProps> = {
  [TabContainerProp.INDEX]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The index of the active tab',
  },
  [TabContainerProp.PANE_ID]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The ID of the active tab pane',
  },
};
