import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/PropV2';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';

export enum TextFieldProp {
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG = 'propertyConfig',
}

export interface TextFieldProps {
  [TextFieldProp.VALUE]: string;
  [TextFieldProp.PLACEHOLDER]: string;
  [TextFieldProp.LABEL]: string;
  [TextFieldProp.PROPERTY_CONFIG]: EntityPropertyConfig;
}

export const textFieldProps: PropConfigMap<TextFieldProps> = {
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
  [TextFieldProp.PROPERTY_CONFIG]: {
    default: defaultEntityPropertyConfig,
    control: {
      type: ControlType.TEXT,
    },
    description: 'The property configuration for the text field',
  },
};
