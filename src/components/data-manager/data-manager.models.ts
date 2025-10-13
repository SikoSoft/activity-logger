import {
  Entity,
  EntityConfig,
  EntityPropertyConfig,
} from 'api-spec/models/Entity';

export const baseFileName = 'data-dump';

export type ExportMetaData = {
  version: string;
  date: string;
};

export interface ExportPropertyConfig
  extends Omit<EntityPropertyConfig, 'userId' | 'entityConfigId'> {}

export interface ExportEntityConfig
  extends Omit<EntityConfig, 'userId' | 'properties'> {
  properties: ExportPropertyConfig[];
}

export type ExportConfigData = ExportEntityConfig[];

export type ExportEntityData = Omit<Entity, 'userId'>[];

export type ExportDataContents = {
  meta: ExportMetaData;
  [ExportDataType.CONFIGS]: ExportConfigData;
  [ExportDataType.ENTITIES]: ExportEntityData;
};

export enum ExportDataType {
  CONFIGS = 'configs',
  ENTITIES = 'entities',
}

export type ExportDataSet = {
  entityConfigId: number;
  dataType: ExportDataType;
};
