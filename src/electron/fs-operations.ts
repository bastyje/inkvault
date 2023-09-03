import { FileInfo, FileType } from "../shared/file-info";
import * as fs from "fs";
import * as path from "path";

const getFileType = (name: string, fileStats: fs.Stats): FileType | undefined => {
  const extension = path.extname(name);
  if (fileStats.isDirectory()) return 'directory';
  else {
    switch (extension) {
      case 'directory':
      case 'txt':
      case 'md':
      case 'other':
        return extension;
      default:
        return undefined;
    }
  }
}

export const getFileTree = async (root: string): Promise<FileInfo[]> => {
  return await Promise.all((await fs.promises.readdir(root)).map(async file => {
    const filePath = path.join(root, file);
    const fileInfo = await fs.promises.stat(filePath);
    return {
      name: file,
      path: filePath,
      type: getFileType(file, fileInfo),
      children: fileInfo.isDirectory() ? await getFileTree(filePath) : []
    } as FileInfo;
  }));
}