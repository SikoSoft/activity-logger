import { PropConfigMap, PropTypes } from '@/models/Prop';
import { Entity } from 'api-spec/models/Entity';

export enum EntityListProp {}

export interface EntityListProps extends PropTypes {}

export const entityListProps: PropConfigMap<EntityListProps> = {};

export type EntityListResult = {
  entities: Entity[];
  total: number;
};
