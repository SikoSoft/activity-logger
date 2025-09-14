export enum ControlType {
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  TEXT = 'text',
  SELECT = 'select',
  HIDDEN = 'hidden',
  IMAGE = 'image',
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
  options: string[];
}

export interface HiddenControl {
  type: ControlType.HIDDEN;
}

export interface ImageControl {
  type: ControlType.IMAGE;
  src: string;
  alt: string;
}

export type Control =
  | BooleanControl
  | NumberControl
  | TextControl
  | SelectControl
  | HiddenControl
  | ImageControl;
