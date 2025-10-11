export const baseFileName = 'data-dump';

export enum ExportDataType {
  CONFIGS = 'configs',
  ENTITIES = 'entities',
}

export type ExportDataSet = {
  entityConfigId: number;
  dataType: ExportDataType;
};

export enum FileName {
  CONFIGS = 'configs.json',
  ENTITIES = 'entities.json',
}
