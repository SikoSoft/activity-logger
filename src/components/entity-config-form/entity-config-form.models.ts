import { PropTypes } from '@/models/Prop';

export interface PropertyConfig {}

export interface EntityConfig {
  id: string;
  name: string;
  description: string;
  properties: PropertyConfig[];
}

export enum EntityConfigFormProp {}

export interface EntityConfigFormProps extends PropTypes {}

export const entityConfigFormProps: EntityConfigFormProps = {};
