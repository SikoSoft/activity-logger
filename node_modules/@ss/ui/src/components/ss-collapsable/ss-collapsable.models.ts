import { PropConfigMap, PropTypes } from '../../models/Prop';

export enum SSCollapsableProp {
  TITLE = 'title',
  OPEN = 'open',
  PANEL_ID = 'panelId',
}

export interface SSCollapsableProps extends PropTypes {
  [SSCollapsableProp.TITLE]: string;
  [SSCollapsableProp.OPEN]: boolean;
  [SSCollapsableProp.PANEL_ID]: string;
}

export const ssCollapsableProps: PropConfigMap<SSCollapsableProps> = {
  [SSCollapsableProp.TITLE]: {
    default: '',
    description: 'The heading in which is always displayed',
    control: 'text',
  },
  [SSCollapsableProp.OPEN]: {
    default: false,
    description: 'Whether the content is in opened state',
    control: 'boolean',
  },
  [SSCollapsableProp.PANEL_ID]: {
    default: '',
    description: 'The unique identifier for the panel',
    control: 'text',
  },
};
