import { ActionView } from '@/models/Action';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ActionNavProp {
  ACTIVE = 'active',
}

export interface ActionNavProps extends PropTypes {
  [ActionNavProp.ACTIVE]: ActionView;
}

export const actionNavProps: PropConfigMap<ActionNavProps> = {
  [ActionNavProp.ACTIVE]: {
    default: ActionView.INPUT,
    control: 'text',
    description: 'The active view',
  },
};
