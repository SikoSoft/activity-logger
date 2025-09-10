import { ItemProperty } from 'api-spec/models/Entity';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum EntityFormProp {
  ENTITY_ID = 'entityId',
  TYPE = 'type',
  DESC = 'desc',
  OCCURRED_AT = 'occurredAt',
  TAGS = 'tags',
  TAG_VALUE = 'tagValue',
  PROPERTIES = 'properties',
}

export interface EntityFormProps extends PropTypes {
  [EntityFormProp.ENTITY_ID]: number;
  [EntityFormProp.TYPE]: number;
  [EntityFormProp.DESC]: string;
  [EntityFormProp.OCCURRED_AT]: string;
  [EntityFormProp.TAGS]: string[];
  [EntityFormProp.TAG_VALUE]: string;
  [EntityFormProp.PROPERTIES]: ItemProperty[];
}

export const entityFormProps: PropConfigMap<EntityFormProps> = {
  [EntityFormProp.ENTITY_ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the entity',
  },
  [EntityFormProp.TYPE]: {
    default: 0,
    control: 'number',
    description: 'The type of the entity',
  },
  [EntityFormProp.DESC]: {
    default: '',
    control: 'text',
    description: 'The description of the entity',
  },
  [EntityFormProp.OCCURRED_AT]: {
    default: '',
    control: 'text',
    description: 'The occurrence date of the entity',
  },
  [EntityFormProp.TAGS]: {
    default: [],
    control: 'text',
    description: 'The tags of the entity',
  },
  [EntityFormProp.TAG_VALUE]: {
    default: '',
    control: 'text',
    description: 'The value of the tag',
  },
  [EntityFormProp.PROPERTIES]: {
    default: [],
    control: 'text',
    description: 'The properties of the entity',
  },
};

export interface RequestBody {
  desc: string;
  occurredAt: string;
  timeZone: number;
  tags: string[];
  properties: ItemProperty[];
}

export enum SuggestionInputType {
  TAG = 'tag',
  ACTION = 'action',
}

export type SuggestionLastInput = Record<
  SuggestionInputType,
  { hadResults: boolean; value: string }
>;
