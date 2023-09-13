import { FileInfo, FileType } from '../shared/file-info';
import * as fs from 'fs';
import * as path from 'path';
import { EncryptedFile } from '../shared/encrypted-file';

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
  return await Promise.all((await fs.promises.readdir(root))
    .filter(file => !(/(^|\/)\.[^\/.]/g).test(file))
    .map(async file => {
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

export const writeEncryptedFile = (encryptionInfo: EncryptedFile, path: string): Promise<void> => {
  return fs.promises.writeFile(path, JSON.stringify({
    salt: encryptionInfo.salt,
    keyName: encryptionInfo.keyName,
    content: encryptionInfo.content
  } as EncryptedFile), {encoding: 'utf-8'});
}

export const readEncryptedFile = (path: string): Promise<EncryptedFile> => {
  return fs.promises.readFile(path, {encoding: 'utf-8'}).then(text => {
    return JSON.parse(text) as EncryptedFile;
  });
}