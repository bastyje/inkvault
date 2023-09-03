import { WebAuthnKeyInfo } from "./web-authn-key-info";
import { FileInfo } from "./file-info";

interface WindowManipulation {
  close: () => void,
  minimize: () => void,
  maximize: () => void
}

interface Events {
  onFileChanged: (path: string, callback: () => void) => void
}

interface Fs {
  getFilesList: (root: string, relative: string) => Promise<string[]>,
  getFileTree: (root: string) => Promise<FileInfo[]>,
  readFile: (root: string, relative: string) => Promise<string>,
  writeFile: (path: string, content: string) => void,
  selectFromFileDialog: () => Promise<string | null>
}

interface WebAuthnKey {
  getKeys: (root: string) => Promise<WebAuthnKeyInfo[]>,
  createLocal: (root: string, keyInfo: WebAuthnKeyInfo) => void,
  createGlobal: (root: string, keyInfo: WebAuthnKeyInfo) => void
}

declare global {
  interface Window {
    api: {
      windowManipulation: WindowManipulation,
      events: Events,
      fs: Fs,
      webauthnKey: WebAuthnKey
    }
  }
}