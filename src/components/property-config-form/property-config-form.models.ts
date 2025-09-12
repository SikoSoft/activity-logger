import { ControlType } from '@/models/Control';
import { DataType, RenderType } from 'api-spec/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum PropertyConfigFormProp {
  DATA_TYPE = 'dataType',
  RENDER_TYPE = 'renderType',
  ENTITY_CONFIG_ID = 'entityConfigId',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  NAME = 'name',
  REPEAT = 'repeat',
  ALLOWED = 'allowed',
  REQUIRED = 'required',
  PREFIX = 'prefix',
  SUFFIX = 'suffix',
}

export interface PropertyConfigFormProps extends PropTypes {
  [PropertyConfigFormProp.DATA_TYPE]: string;
  [PropertyConfigFormProp.RENDER_TYPE]: string;
  [PropertyConfigFormProp.ENTITY_CONFIG_ID]: number;
  [PropertyConfigFormProp.PROPERTY_CONFIG_ID]: number;
  [PropertyConfigFormProp.NAME]: string;
  [PropertyConfigFormProp.REQUIRED]: number;
  [PropertyConfigFormProp.REPEAT]: number;
  [PropertyConfigFormProp.ALLOWED]: number;
  [PropertyConfigFormProp.PREFIX]: string;
  [PropertyConfigFormProp.SUFFIX]: string;
}

export const propertyConfigFormProps: PropConfigMap<PropertyConfigFormProps> = {
  [PropertyConfigFormProp.DATA_TYPE]: {
    default: DataType.SHORT_TEXT,
    control: { type: ControlType.SELECT, options: Object.values(DataType) },
    description: 'The data type of the property',
  },
  [PropertyConfigFormProp.RENDER_TYPE]: {
    default: RenderType.TEXT,
    control: { type: ControlType.SELECT, options: Object.values(RenderType) },
    description: 'The render type of the property',
  },
  [PropertyConfigFormProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: { type: ControlType.HIDDEN },
    description: 'The ID of the entity config',
  },
  [PropertyConfigFormProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: { type: ControlType.HIDDEN },
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
  [PropertyConfigFormProp.PREFIX]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'The prefix of the property',
  },
  [PropertyConfigFormProp.SUFFIX]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'The suffix of the property',
  },
};
