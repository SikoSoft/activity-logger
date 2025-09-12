import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum ConfirmModalProp {
  open = 'open',
}

export interface ConfirmModalProps extends PropTypes {
  [ConfirmModalProp.open]: boolean;
}

export const confirmModalPropConfig: PropConfigMap<ConfirmModalProps> = {
  [ConfirmModalProp.open]: {
    default: false,
    control: {
      type: ControlType.BOOLEAN,
    },
    description: 'Whether the modal is open',
  },
};
