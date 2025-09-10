import {
  BooleanControl,
  HiddenControl,
  NumberControl,
  SelectControl,
  TextControl,
} from './Control';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropTypes = Record<string, any>;

export type PropControlType<T> = T extends boolean
  ? BooleanControl | HiddenControl
  : T extends number
    ? NumberControl | HiddenControl
    : TextControl | SelectControl | HiddenControl;

export type PropConfigMap<Props extends PropTypes> = {
  [Property in keyof Props]: {
    default: Props[Property];
    control: PropControlType<Props[Property]>;
    description: string;
  };
};
