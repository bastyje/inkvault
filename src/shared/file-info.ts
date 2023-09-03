export type FileType = 'directory' | 'txt' | 'md' | 'other';

export interface FileInfo {
  name: string;
  path: string;
  type: FileType;
  children: FileInfo[];
}