import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum SSToggleProp {
  ON = 'on',
  HIGHLIGHT_TIME = 'highlightTime',
}

export interface SSToggleProps extends PropTypes {
  [SSToggleProp.ON]: boolean;
  [SSToggleProp.HIGHLIGHT_TIME]: number;
}

export const ssToggleProps: PropConfigMap<SSToggleProps> = {
  [SSToggleProp.ON]: {
    default: false,
    description: 'Whether the toggle is in enabled state',
    control: 'boolean',
  },
  [SSToggleProp.HIGHLIGHT_TIME]: {
    default: 350,
    description: 'Time in milliseconds to highlight the toggle when clicked',
    control: 'number',
  },
};
