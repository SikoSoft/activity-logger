import { Property } from '@/mock/entity-config';
import { ControlType } from '@/models/Control';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum EntityListItemProp {
  TYPE = 'type',
  ENTITY_ID = 'entityId',
  DESC = 'desc',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  OCCURRED_AT = 'occurredAt',
  TAGS = 'tags',
  SELECTED = 'selected',
  PROPERTIES = 'properties',
  DEBUG = 'debug',
}

export interface EntityListItemProps extends PropTypes {
  [EntityListItemProp.TYPE]: string;
  [EntityListItemProp.ENTITY_ID]: number;
  [EntityListItemProp.DESC]: string;
  [EntityListItemProp.CREATED_AT]: string;
  [EntityListItemProp.UPDATED_AT]: string;
  [EntityListItemProp.OCCURRED_AT]: string;
  [EntityListItemProp.TAGS]: string[];
  [EntityListItemProp.SELECTED]: boolean;
  [EntityListItemProp.PROPERTIES]: Property[];
  [EntityListItemProp.DEBUG]: boolean;
}

export const entityListItemProps: PropConfigMap<EntityListItemProps> = {
  [EntityListItemProp.TYPE]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The type of the entity',
  },
  [EntityListItemProp.ENTITY_ID]: {
    default: 0,
    control: {
      type: ControlType.NUMBER,
    },
    description: 'The ID of the entity',
  },
  [EntityListItemProp.DESC]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The description of the entity',
  },
  [EntityListItemProp.CREATED_AT]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The creation date of the entity',
  },
  [EntityListItemProp.UPDATED_AT]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The update date of the entity',
  },
  [EntityListItemProp.OCCURRED_AT]: {
    default: '',
    control: {
      type: ControlType.TEXT,
    },
    description: 'The occurrence date of the entity',
  },
  [EntityListItemProp.TAGS]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The tags of the entity',
  },
  [EntityListItemProp.SELECTED]: {
    default: false,
    control: {
      type: ControlType.BOOLEAN,
    },
    description: 'Whether the entity is selected',
  },
  [EntityListItemProp.PROPERTIES]: {
    default: [],
    control: {
      type: ControlType.TEXT,
    },
    description: 'The properties of the entity',
  },
  [EntityListItemProp.DEBUG]: {
    default: false,
    control: {
      type: ControlType.BOOLEAN,
    },
    description: 'Whether debug mode is enabled',
  },
};
