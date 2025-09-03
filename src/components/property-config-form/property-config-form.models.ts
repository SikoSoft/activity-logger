import { ControlType } from '@/models/Control';
import { DataType } from '@/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/PropV2';

export enum PropertyConfigFormProp {
  DATA_TYPE = 'dataType',
  ID = 'id',
  NAME = 'name',
  REPEAT = 'repeat',
  ALLOWED = 'allowed',
  REQUIRED = 'required',
}

export interface PropertyConfigFormProps extends PropTypes {
  [PropertyConfigFormProp.DATA_TYPE]: string;
  [PropertyConfigFormProp.ID]: string;
  [PropertyConfigFormProp.NAME]: string;
  [PropertyConfigFormProp.REQUIRED]: number;
  [PropertyConfigFormProp.REPEAT]: number;
  [PropertyConfigFormProp.ALLOWED]: number;
}

export const propertyConfigFormProps: PropConfigMap<PropertyConfigFormProps> = {
  [PropertyConfigFormProp.DATA_TYPE]: {
    default: 'text',
    control: { type: ControlType.SELECT, options: Object.values(DataType) },
    description: 'The data type of the property',
  },
  [PropertyConfigFormProp.ID]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'The ID of the property',
  },
  [PropertyConfigFormProp.NAME]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'The name of the property',
  },
  [PropertyConfigFormProp.REQUIRED]: {
    default: 0,
    control: { type: ControlType.NUMBER },
    description: 'How many of this property are required',
  },
  [PropertyConfigFormProp.REPEAT]: {
    default: 0,
    control: { type: ControlType.NUMBER },
    description: 'How many times this property can be repeated',
  },
  [PropertyConfigFormProp.ALLOWED]: {
    default: 0,
    control: { type: ControlType.NUMBER },
    description: 'How many of this property are allowed',
  },
};
