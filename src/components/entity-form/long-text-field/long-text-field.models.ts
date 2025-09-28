import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';

export enum LongTextFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  ENTITY_CONFIG_ID = 'entityConfigId',
  UI_ID = 'uiId',
}

export interface LongTextFieldProps {
  [LongTextFieldProp.INSTANCE_ID]: number;
  [LongTextFieldProp.VALUE]: string;
  [LongTextFieldProp.PLACEHOLDER]: string;
  [LongTextFieldProp.LABEL]: string;
  [LongTextFieldProp.PROPERTY_CONFIG_ID]: number;
  [LongTextFieldProp.ENTITY_CONFIG_ID]: number;
  [LongTextFieldProp.UI_ID]: string;
}

export const longTextFieldProps: PropConfigMap<LongTextFieldProps> = {
  [LongTextFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the text field',
  },
  [LongTextFieldProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the text field',
  },
  [LongTextFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the text field',
  },
  [LongTextFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the text field',
  },
  [LongTextFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The property configuration ID for the text field',
  },
  [LongTextFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The entity configuration ID for the text field',
  },
  [LongTextFieldProp.UI_ID]: {
    default: '',
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The UI ID for the text field',
  },
};
