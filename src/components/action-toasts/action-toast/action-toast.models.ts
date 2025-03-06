import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ActionToastProp {
  MESSAGE = 'message',
}

export interface ActionToastProps {
  [ActionToastProp.MESSAGE]: string;
}

export const actionToastPropConfig: PropConfigMap<ActionToastProps> = {
  [ActionToastProp.MESSAGE]: {
    default: '',
    control: 'text',
    description: 'The message to display',
  },
};
