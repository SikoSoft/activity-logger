export enum ControlType {
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  TEXT = 'text',
  SELECT = 'select',
  HIDDEN = 'hidden',
}

export interface BooleanControl {
  type: ControlType.BOOLEAN;
}

export interface NumberControl {
  type: ControlType.NUMBER;
  min?: number;
  max?: number;
  step?: number;
}

export interface TextControl {
  type: ControlType.TEXT;
}

export interface SelectControl {
  type: ControlType.SELECT;
  options: any[];
}

export interface HiddenControl {
  type: ControlType.HIDDEN;
}

export type Control =
  | BooleanControl
  | NumberControl
  | TextControl
  | SelectControl
  | HiddenControl;
