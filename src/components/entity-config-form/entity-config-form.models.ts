import { ControlType } from '@/models/Control';
import { DataType, PropertyConfig } from 'api-spec/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/PropV2';

export enum EntityConfigFormProp {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  PROPERTIES = 'properties',
}

export interface EntityConfigFormProps extends PropTypes {
  [EntityConfigFormProp.ID]: number;
  [EntityConfigFormProp.NAME]: string;
  [EntityConfigFormProp.DESCRIPTION]: string;
  [EntityConfigFormProp.PROPERTIES]: PropertyConfig[];
}

export const entityConfigFormProps: PropConfigMap<EntityConfigFormProps> = {
  [EntityConfigFormProp.ID]: {
    default: 0,
    control: { type: ControlType.NUMBER },
    description: 'The unique identifier for the entity',
  },
  [EntityConfigFormProp.NAME]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'The name of the entity',
  },
  [EntityConfigFormProp.DESCRIPTION]: {
    default: '',
    control: { type: ControlType.TEXT },
    description: 'A brief description of the entity',
  },
  [EntityConfigFormProp.PROPERTIES]: {
    default: [],
    control: { type: ControlType.TEXT },
    description: 'The properties of the entity',
  },
};
