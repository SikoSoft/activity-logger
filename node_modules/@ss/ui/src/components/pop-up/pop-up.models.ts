import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum PopUpProp {
  OPEN = 'open',
  CLOSE_BUTTON = 'closeButton',
  CLOSE_ON_OUTSIDE_CLICK = 'closeOnOutsideClick',
  CLOSE_ON_ESC = 'closeOnEsc',
}

export interface PopUpProps extends PropTypes {
  [PopUpProp.OPEN]: boolean;
  [PopUpProp.CLOSE_BUTTON]: boolean;
  [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: boolean;
  [PopUpProp.CLOSE_ON_ESC]: boolean;
}

export const popUpProps: PropConfigMap<PopUpProps> = {
  [PopUpProp.OPEN]: {
    default: false,
    control: 'boolean',
    description: 'Whether the pop-up is open or not',
  },
  [PopUpProp.CLOSE_BUTTON]: {
    default: false,
    control: 'boolean',
    description: 'Whether to show the close button',
  },
  [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: {
    default: false,
    control: 'boolean',
    description: 'Whether to close the pop-up when clicking outside of it',
  },
  [PopUpProp.CLOSE_ON_ESC]: {
    default: false,
    control: 'boolean',
    description: 'Whether to close the pop-up when pressing the ESC key',
  },
};
