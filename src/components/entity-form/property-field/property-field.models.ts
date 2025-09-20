import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';
import {
  DataType,
  defaultEntityPropertyConfig,
  PropertyDataValue,
  ShortTextEntityPropertyConfig,
} from 'api-spec/models/Entity';

export enum PropertyFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  ENTITY_CONFIG_ID = 'entityConfigId',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  UI_ID = 'uiId',
}

export interface PropertyFieldProps {
  [PropertyFieldProp.INSTANCE_ID]: number;
  [PropertyFieldProp.VALUE]: PropertyDataValue;
  [PropertyFieldProp.PLACEHOLDER]: string;
  [PropertyFieldProp.LABEL]: string;
  [PropertyFieldProp.ENTITY_CONFIG_ID]: number;
  [PropertyFieldProp.PROPERTY_CONFIG_ID]: number;
  [PropertyFieldProp.UI_ID]: string;
}

export const propertyFieldProps: PropConfigMap<PropertyFieldProps> = {
  [PropertyFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the property field',
  },
  [PropertyFieldProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the property field',
  },
  [PropertyFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the property field',
  },
  [PropertyFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the property field',
  },
  [PropertyFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The ID of the entity config',
  },
  [PropertyFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The ID of the property config',
  },
  [PropertyFieldProp.UI_ID]: {
    default: '',
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The ID used for tracking purposes in the UI',
  },
};
