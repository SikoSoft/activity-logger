import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';

export type ShortTextLastInput = { hadResults: boolean; value: string };

export enum ShortTextFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  ENTITY_CONFIG_ID = 'entityConfigId',
  UI_ID = 'uiId',
}

export interface ShortTextFieldProps {
  [ShortTextFieldProp.INSTANCE_ID]: number;
  [ShortTextFieldProp.VALUE]: string;
  [ShortTextFieldProp.PLACEHOLDER]: string;
  [ShortTextFieldProp.LABEL]: string;
  [ShortTextFieldProp.PROPERTY_CONFIG_ID]: number;
  [ShortTextFieldProp.ENTITY_CONFIG_ID]: number;
  [ShortTextFieldProp.UI_ID]: string;
}

export const shortTextFieldProps: PropConfigMap<ShortTextFieldProps> = {
  [ShortTextFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the text field',
  },
  [ShortTextFieldProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the text field',
  },
  [ShortTextFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the text field',
  },
  [ShortTextFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the text field',
  },
  [ShortTextFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The property configuration ID for the text field',
  },
  [ShortTextFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The entity configuration ID for the text field',
  },
  [ShortTextFieldProp.UI_ID]: {
    default: '',
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The UI ID for the text field',
  },
};
