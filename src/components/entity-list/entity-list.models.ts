import { PropConfigMap, PropTypes } from '@/models/Prop';
import { Entity, EntityConfig } from 'api-spec/models/Entity';
import { ListConfig } from 'api-spec/models/List';

export enum EntityListProp {}

export interface EntityListProps extends PropTypes {}

export const entityListProps: PropConfigMap<EntityListProps> = {};

export type EntityListResult = {
  entities: Entity[];
  total: number;
};

export type PublicEntityListResult = EntityListResult & {
  listConfig: ListConfig;
  entityConfigs: EntityConfig[];
};
