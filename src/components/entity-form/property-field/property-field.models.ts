import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';
import {
  DataType,
  defaultEntityPropertyConfig,
  ShortTextEntityPropertyConfig,
} from 'api-spec/models/Entity';

export enum PropertyFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG = 'propertyConfig',
}

export interface PropertyFieldProps {
  [PropertyFieldProp.INSTANCE_ID]: number;
  [PropertyFieldProp.VALUE]: string;
  [PropertyFieldProp.PLACEHOLDER]: string;
  [PropertyFieldProp.LABEL]: string;
  [PropertyFieldProp.PROPERTY_CONFIG]: ShortTextEntityPropertyConfig;
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
  [PropertyFieldProp.PROPERTY_CONFIG]: {
    default: {
      ...defaultEntityPropertyConfig,
      dataType: DataType.SHORT_TEXT,
      defaultValue: '',
    },
    control: {
      type: ControlType.TEXT,
    },
    description: 'The property configuration for the text field',
  },
};
