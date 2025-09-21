import { ControlType } from '@/models/Control';
import { PropConfigMap } from '@/models/Prop';
import { defaultEntityPropertyConfig } from 'api-spec/models/Entity';

export enum IntFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  ENTITY_CONFIG_ID = 'entityConfigId',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  UI_ID = 'uiId',
}

export interface IntFieldProps {
  [IntFieldProp.INSTANCE_ID]: number;
  [IntFieldProp.VALUE]: number;
  [IntFieldProp.PLACEHOLDER]: string;
  [IntFieldProp.LABEL]: string;
  [IntFieldProp.PROPERTY_CONFIG_ID]: number;
  [IntFieldProp.ENTITY_CONFIG_ID]: number;
  [IntFieldProp.UI_ID]: string;
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
  [IntFieldProp.PROPERTY_CONFIG_ID]: {
    default: defaultEntityPropertyConfig.id,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The property configuration ID for the input field',
  },
  [IntFieldProp.ENTITY_CONFIG_ID]: {
    default: defaultEntityPropertyConfig.entityConfigId,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The entity configuration ID for the input field',
  },
  [IntFieldProp.UI_ID]: {
    default: '',
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The UI ID for the input field',
  },
};
