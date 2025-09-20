import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';
import {
  defaultEntityPropertyConfig,
  EntityPropertyConfig,
  ImageDataValue,
} from 'api-spec/models/Entity';

export enum ImageFieldProp {
  INSTANCE_ID = 'instanceId',
  VALUE = 'value',
  PLACEHOLDER = 'placeholder',
  LABEL = 'label',
  PROPERTY_CONFIG_ID = 'propertyConfigId',
  ENTITY_CONFIG_ID = 'entityConfigId',
  SRC = 'src',
  ALT = 'alt',
}

export interface ImageFieldProps extends PropTypes {
  [ImageFieldProp.INSTANCE_ID]: number;
  [ImageFieldProp.VALUE]: ImageDataValue;
  [ImageFieldProp.PLACEHOLDER]: string;
  [ImageFieldProp.LABEL]: string;
  [ImageFieldProp.PROPERTY_CONFIG_ID]: number;
  [ImageFieldProp.ENTITY_CONFIG_ID]: number;
  [ImageFieldProp.SRC]: string;
  [ImageFieldProp.ALT]: string;
}

export const imageFieldProps: PropConfigMap<ImageFieldProps> = {
  [ImageFieldProp.INSTANCE_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The instance ID of the image field',
  },
  [ImageFieldProp.VALUE]: {
    default: {
      src: '',
      alt: '',
    },
    control: {
      type: ControlType.IMAGE,
      src: '',
      alt: '',
    },
    description: 'The value of the image field',
  },
  [ImageFieldProp.PLACEHOLDER]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The placeholder text for the image field',
  },
  [ImageFieldProp.LABEL]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The label text for the image field',
  },
  [ImageFieldProp.PROPERTY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The ID of the property config',
  },
  [ImageFieldProp.ENTITY_CONFIG_ID]: {
    default: 0,
    control: {
      type: ControlType.HIDDEN,
    },
    description: 'The ID of the entity config',
  },
  [ImageFieldProp.SRC]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The source URL for the image field',
  },
  [ImageFieldProp.ALT]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The alt text for the image field',
  },
};
