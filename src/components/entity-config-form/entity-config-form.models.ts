import { ControlType } from '@/models/Control';
import { EntityPropertyConfig } from 'api-spec/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/Prop';
import { RevisionProblems } from 'api-spec/models/Revision';

export interface PropertyConfigInstance {
  propertyConfigId: number;
  instanceId: number;
  uiId: string;
  problems: RevisionProblems;
}

export type PropertyConfigProblemMap = RevisionProblems[] | undefined[];

export enum EntityConfigFormProp {
  ENTITY_CONFIG_ID = 'entityConfigId',
  NAME = 'name',
  DESCRIPTION = 'description',
  PROPERTIES = 'properties',
  ALLOW_PROPERTY_ORDERING = 'allowPropertyOrdering',
}

export interface EntityConfigFormProps extends PropTypes {
  [EntityConfigFormProp.ENTITY_CONFIG_ID]: number;
  [EntityConfigFormProp.NAME]: string;
  [EntityConfigFormProp.DESCRIPTION]: string;
  [EntityConfigFormProp.PROPERTIES]: EntityPropertyConfig[];
  [EntityConfigFormProp.ALLOW_PROPERTY_ORDERING]: boolean;
}

export const entityConfigFormProps: PropConfigMap<EntityConfigFormProps> = {
  [EntityConfigFormProp.ENTITY_CONFIG_ID]: {
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
  [EntityConfigFormProp.ALLOW_PROPERTY_ORDERING]: {
    default: false,
    control: { type: ControlType.BOOLEAN },
    description: 'Whether property ordering is allowed for this entity',
  },
};
