import {
  BooleanControl,
  NumberControl,
  SelectControl,
  TextControl,
} from './Control';

export type PropTypes = Record<string, any>;

export type PropControlType<T> = T extends boolean
  ? BooleanControl
  : T extends number
    ? NumberControl
    : TextControl | SelectControl;

export type PropConfigMap<Props extends PropTypes> = {
  [Property in keyof Props]: {
    default: Props[Property];
    control: PropControlType<Props[Property]>;
    description: string;
  };
};
