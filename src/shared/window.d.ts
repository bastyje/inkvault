import { WebAuthnKeyInfo } from "./web-authn-key-info";
import { FileInfo } from "./file-info";
import { EncryptedFile } from "./encrypted-file";
import { ReadFile } from "./read-file";
import { VaultInfo } from "./vault-info";

interface WindowManipulation {
  close: () => void,
  minimize: () => void,
  maximize: () => void
}

interface Events {
  onFileChanged: (path: string, callback: () => void) => void
}

interface Fs {
  getFileTree: (path: string) => Promise<FileInfo[]>,
  readFile: (path: string) => Promise<ReadFile>,
  readEncryptedFile: (path: string) => Promise<EncryptedFile>,
  writeFile: (path: string, content: string) => Promise<void>,
  writeEncryptedFile: (encryptionInfo: EncryptedFile, path: string) => Promise<void>,
  createNewVault: (path: string, name: string) => Promise<string>,
  getPreviouslyOpenedVault: () => Promise<string | null>,
  getAllVaultsFromComputer: () => Promise<VaultInfo[]>,
  getPathFromModal: () => Promise<string | null>
}

interface WebAuthnKey {
  getKey: (root: string, keyName: string) => Promise<WebAuthnKeyInfo>,
  getKeys: (root: string) => Promise<WebAuthnKeyInfo[]>,
  createLocal: (root: string, keyInfo: WebAuthnKeyInfo) => Promise<void>,
  createGlobal: (root: string, keyInfo: WebAuthnKeyInfo) => Promise<void>
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