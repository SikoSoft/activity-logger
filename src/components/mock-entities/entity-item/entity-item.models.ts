import { PropConfigMap, PropTypes } from '@/models/Prop';
import { ItemProperty } from '@/models/Entity';

export enum EntityItemProp {
  _ID = '_id',
  TYPE = 'type',
  PROPERTIES = 'properties',
}

export interface EntityItemProps extends PropTypes {
  [EntityItemProp._ID]: number;
  [EntityItemProp.TYPE]: number;
  [EntityItemProp.PROPERTIES]: ItemProperty[];
}

export const entityItemProps: PropConfigMap<EntityItemProps> = {
  [EntityItemProp._ID]: {
    default: 0,
    control: 'number',
    description: 'The ID of the entity item',
  },
  [EntityItemProp.TYPE]: {
    default: 0,
    control: 'number',
    description: 'The type of the entity item',
  },
  [EntityItemProp.PROPERTIES]: {
    default: [],
    control: 'text',
    description: 'The properties of the entity item',
  },
};
