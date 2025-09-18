import { PropConfigMap } from '../../models/Prop';

export enum SSButtonProp {
  TEXT = 'text',
  DISABLED = 'disabled',
  LOADING = 'loading',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  CLASS = 'class',
}

export interface SSButtonProps {
  [SSButtonProp.TEXT]: string;
  [SSButtonProp.DISABLED]: boolean;
  [SSButtonProp.LOADING]: boolean;
  [SSButtonProp.POSITIVE]: boolean;
  [SSButtonProp.NEGATIVE]: boolean;
  [SSButtonProp.CLASS]: string;
}

export const ssButtonProps: PropConfigMap<SSButtonProps> = {
  [SSButtonProp.TEXT]: {
    default: '',
    description: 'Human readable content to be displayed',
    control: 'text',
  },
  [SSButtonProp.DISABLED]: {
    default: false,
    description: 'Whether the field is locked from use',
    control: 'boolean',
  },
  [SSButtonProp.LOADING]: {
    default: false,
    description: 'Whether the button shows loader and is disabled',
    control: 'boolean',
  },
  [SSButtonProp.POSITIVE]: {
    default: false,
    description: 'Whether to style the button in a positive manner',
    control: 'boolean',
  },
  [SSButtonProp.NEGATIVE]: {
    default: false,
    description: 'Whether to style the button in a negative manner',
    control: 'boolean',
  },
  [SSButtonProp.CLASS]: {
    default: '',
    description: 'Any number of custom CSS classes, separated by spaces',
    control: 'text',
  },
};
