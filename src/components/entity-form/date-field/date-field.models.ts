import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';

export enum DateFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  ENTITY_CONFIG_ID = 'entityConfigId',
  UI_ID = 'uiId',
}

export interface DateFieldProps {
  [DateFieldProp.INSTANCE_ID]: number;
  [DateFieldProp.VALUE]: string;
  [DateFieldProp.PLACEHOLDER]: string;
  [DateFieldProp.LABEL]: string;
  [DateFieldProp.PROPERTY_CONFIG_ID]: number;
  [DateFieldProp.ENTITY_CONFIG_ID]: number;
  [DateFieldProp.UI_ID]: string;
}

export const dateFieldProps: PropConfigMap<DateFieldProps> = {
  [DateFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the date field',
  },
  [DateFieldProp.VALUE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The value of the date field',
  },
  [DateFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the date field',
  },
  [DateFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the date field',
  },
  [DateFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The property configuration ID for the date field',
  },
  [DateFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The entity configuration ID for the date field',
  },
  [DateFieldProp.UI_ID]: {
    default: '',
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The UI ID for the date field',
  },
};
