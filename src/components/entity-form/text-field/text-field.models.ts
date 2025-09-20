import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';
import {
  DataType,
  defaultEntityPropertyConfig,
  ShortTextEntityPropertyConfig,
} from 'api-spec/models/Entity';

export enum TextFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  ENTITY_CONFIG_ID = 'entityConfigId',
}

export interface TextFieldProps {
  [TextFieldProp.INSTANCE_ID]: number;
  [TextFieldProp.VALUE]: string;
  [TextFieldProp.PLACEHOLDER]: string;
  [TextFieldProp.LABEL]: string;
  [TextFieldProp.PROPERTY_CONFIG_ID]: number;
  [TextFieldProp.ENTITY_CONFIG_ID]: number;
}

export const textFieldProps: PropConfigMap<TextFieldProps> = {
  [TextFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the text field',
  },
  [TextFieldProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the text field',
  },
  [TextFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the text field',
  },
  [TextFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the text field',
  },
  [TextFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The property configuration ID for the text field',
  },
  [TextFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The entity configuration ID for the text field',
  },
};
