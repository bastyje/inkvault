export type TableDataType = 'string' | 'number';

export interface TableColumnConfig {
  id: string;
  displayName: string;
  dataType: TableDataType
}

export interface TableConfig {
  columns: TableColumnConfig[];
}