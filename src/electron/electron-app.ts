import { reload } from '../utils/reloader';
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, ipcMain, net, protocol, dialog } from "electron";
import { WebAuthnKeyInfo } from "../shared/web-authn-key-info";
import { getFileTree, readEncryptedFile, writeEncryptedFile } from "./fs-operations";
import { mapKeyToFileWrite, mapKeyToUse } from "../utils/converters";
import { EncryptedFile } from "../shared/encrypted-file";
import { ReadFile } from "../shared/read-file";
import { DOT_DIRECTORY, VAULTS_FILE, WEBAUTHN_KEYS_FILE } from "../file-names";
import { VaultInfo } from "../shared/vault-info";


export class ElectronApp {

  private _mainWindow?: BrowserWindow;

  constructor() {
    this.createElectronEventHandlers();
    this.appendSwitches();
    app.whenReady().then(_ => {
      this.createRendererToMainMessageHandlers();
      this.createRendererToMainToWayMessageHandlers();
      this.createMainToRendererEvents();
      this.createProtocolHandlers();
      this.createWindow();
    });
  }

  private createWindow(): void {
    this._mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    reload(this._mainWindow);

    this._mainWindow.webContents.openDevTools({
      mode: "bottom"
    });

    this._mainWindow.loadURL('http://localhost/index.html');
  }

  private createRendererToMainMessageHandlers(): void {
    ipcMain.on('close', () => {
      this._mainWindow?.close();
    });

    ipcMain.on('minimize', () => {
      this._mainWindow?.minimize();
    });

    ipcMain.on('maximize', () => {
      this._mainWindow?.maximize();
    });
  }

  private createRendererToMainToWayMessageHandlers(): void {
    ipcMain.handle('read-file', async (event, args) => {
      let encrypted = false;
      return fs.promises.readFile(args.path, {encoding: 'utf-8'}).then(text => {
        try {
          const encryptedFile = JSON.parse(text) as EncryptedFile;
          encrypted = encryptedFile.keyName !== undefined;
        } catch (e) {
          encrypted = false;
        }

        return {
          encrypted,
          content: encrypted ? null : text
        } as ReadFile;
      });
    });

    ipcMain.handle('get-key', async (event, args) => {
      return fs.promises.readFile(path.join(args.root, DOT_DIRECTORY, WEBAUTHN_KEYS_FILE), { encoding: 'utf-8'}).then(text => {
        const key = (JSON.parse(text) as WebAuthnKeyInfo[]).find(key => {
          return key.keyName === args.keyName
        });
        return key === undefined ? null : mapKeyToUse(key);
      });
    });

    ipcMain.handle('get-keys', async (event, args) => {
      return fs.promises.readFile(path.join(args.root, DOT_DIRECTORY, WEBAUTHN_KEYS_FILE), { encoding: 'utf-8'}).then(text => {
        return (JSON.parse(text) as WebAuthnKeyInfo[]).map(mapKeyToUse);
      });
    });

    ipcMain.handle('get-file-tree', async (event: Electron.IpcMainInvokeEvent, args)=> {
      return await getFileTree(args.path);
    });

    ipcMain.handle('get-path-from-modal', async () => {
      return dialog.showOpenDialog(this._mainWindow!, {
        title: 'Select directory',
        defaultPath: app.getPath('home'),
        properties: ['openDirectory']
      }).then(result => {
        return result.canceled || result.filePaths.length !== 1 ? null : result.filePaths[0];
      })
    });

    ipcMain.handle('create-new-vault', async (event, args) => {
      const dirPath = args.path;
      if (!fs.existsSync(dirPath)) return null;
      const dotDirPath = path.join(dirPath, DOT_DIRECTORY);
      return fs.promises.mkdir(dotDirPath).then(_ => {
        const vaultsPath = path.join(app.getPath('userData'), VAULTS_FILE);
        const vaults: VaultInfo[] = [{name: args.name, path: dirPath}];
        fs.promises.readFile(vaultsPath, {encoding: 'utf-8'}).then(fileText => {
          vaults.push(...JSON.parse(fileText) as VaultInfo[]);
        }).finally(() => {
          fs.promises.writeFile(vaultsPath, JSON.stringify(vaults), {encoding: 'utf-8'});
        });
        return fs.promises.writeFile(path.join(dotDirPath, WEBAUTHN_KEYS_FILE), '[]');
      }).catch();
    });

    ipcMain.handle('write-file', async (event, args) => {
      return fs.promises.writeFile(args.path, args.content, { encoding: 'utf-8' });
    });

    ipcMain.handle('write-encrypted-file', async (event, args) => {
      return writeEncryptedFile(args.encryptionInfo, args.path);
    });

    ipcMain.handle('read-encrypted-file', async (event, args) => {
      return readEncryptedFile(args.path);
    });

    const createWebAuthnKey = (filePath: string, key: WebAuthnKeyInfo) =>
    {
      return fs.promises.readFile(filePath, {encoding: 'utf-8'}).then((content: string) => {
        const keys = (JSON.parse(content) as WebAuthnKeyInfo[]).map(mapKeyToFileWrite);
        if (!keys.some(k => k.keyName === key.keyName)) {
          keys.push(key);
          return fs.promises.writeFile(filePath, JSON.stringify(keys), {encoding: 'utf-8'});
        }
      });
    }

    ipcMain.handle('create-local-webauthn-key', async (event, args) => {
      const filePath = path.join(args.root,DOT_DIRECTORY, WEBAUTHN_KEYS_FILE);
      return createWebAuthnKey(filePath, args.keyInfo);
    });

    ipcMain.handle('create-global-webauthn-key', async (event, args) => {
      const filePath = path.join(app.getPath('userData'), WEBAUTHN_KEYS_FILE);
      return createWebAuthnKey(filePath, args.keyInfo);
    });

    ipcMain.handle('get-all-vaults-from-computer', async (event, args) => {
      const vaultsPath = path.join(app.getPath('userData'), VAULTS_FILE);
      return fs.promises.readFile(vaultsPath, {encoding: 'utf-8'}).then(text => {
        return JSON.parse(text) as VaultInfo[];
      })
    });
  }

  private createMainToRendererEvents(): void {
    // this._mainWindow?.webContents.send('file-changed');
  }

  private createProtocolHandlers(): void {
    protocol.handle('http', request => {
      let { host, pathname } = url.parse(request.url);
      if (pathname === null) pathname = '';
      return host === 'localhost'
        ? net.fetch(`file://${ path.join(__dirname, '..', pathname) }`)
        : net.fetch(request.url, { bypassCustomProtocolHandlers: true });
    });
  }

  private appendSwitches(): void {
    app.commandLine.appendSwitch('enable-experimental-web-platform-features');
  }

  private createElectronEventHandlers(): void {
    app.on('window-all-closed', () => {
      app.quit();
    });
  }
}