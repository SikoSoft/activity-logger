import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';

export enum IntFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG = 'propertyConfig',
}

export interface IntFieldProps {
  [IntFieldProp.INSTANCE_ID]: number;
  [IntFieldProp.VALUE]: number;
  [IntFieldProp.PLACEHOLDER]: string;
  [IntFieldProp.LABEL]: string;
  [IntFieldProp.PROPERTY_CONFIG]: EntityPropertyConfig;
}

export const intFieldProps: PropConfigMap<IntFieldProps> = {
  [IntFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the input field',
  },
  [IntFieldProp.VALUE]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The value of the input field',
  },
  [IntFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the input field',
  },
  [IntFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the input field',
  },
  [IntFieldProp.PROPERTY_CONFIG]: {
    default: defaultEntityPropertyConfig,
    control: {
      type: ControlType.TEXT,
    },
    description: 'The property configuration for the input field',
  },
};
