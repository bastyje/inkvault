import { reload } from '../utils/reloader';
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, ipcMain, net, protocol, dialog } from "electron";
import IpcMainEvent = Electron.IpcMainEvent;
import { WebAuthnKeyInfo } from "../shared/web-authn-key-info";
import { getFileTree } from "./fs-operations";


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

    ipcMain.on('create-local-webauthn-key', (event: IpcMainEvent, root: string, keyInfo: WebAuthnKeyInfo) => {
      const filePath = path.join(root, 'webauthn-keys.json');
      fs.promises.readFile(filePath, { encoding: 'utf-8'}).then((content: string) => {
        const keys = (JSON.parse(content) as WebAuthnKeyInfo[]).map(key => {
          return {
            keyName: key.keyName,
            userDisplayName: key.userDisplayName,
            userEmail: key.userEmail,
            salt: Array.from(key.salt),
            transports: key.transports,
            rawId: Array.from(key.rawId)
          } as WebAuthnKeyInfo
        });
        if (!keys.some(k => k.keyName === keyInfo.keyName)) {
          keys.push(keyInfo);
          fs.promises.writeFile(filePath, JSON.stringify(keys), {encoding: 'utf-8'});
        }
      });
    });

    ipcMain.on('create-global-webauthn-key', (event: IpcMainEvent) => {

    });

    ipcMain.on('write-file', (event: IpcMainEvent, path: string, content: string) => {
      fs.promises.writeFile(path, content, { encoding: 'utf-8' });
    });
  }

  private createRendererToMainToWayMessageHandlers(): void {
    ipcMain.handle('get-files-list', async (event, args) => {
      const root = path.join(args.root, args.relative);
      return await Promise.all((await fs.promises.readdir(root)).map(async f => {
        return (await fs.promises.stat(path.join(root, f))).isDirectory()
          ? {isDirectory: true, name: f}
          : {isDirectory: false, name: f}
      }));
    });

    ipcMain.handle('read-file', async (event, args) => {
      return await fs.promises.readFile(path.join(args.root, args.relative), { encoding: 'utf-8' })
    });

    ipcMain.handle('get-keys', async (event, args) => {
      return JSON.parse(await fs.promises.readFile(path.join(args.root, 'webauthn-keys.json'), { encoding: 'utf-8'}));
    });

    ipcMain.handle('get-file-tree', async (event: Electron.IpcMainInvokeEvent, args)=> {
      return await getFileTree(args.root);
    });

    ipcMain.handle('select-from-file-dialog', async () => {
      return dialog.showOpenDialog(this._mainWindow!, {
        title: 'Select location of new vault',
        defaultPath: app.getPath('home'),
        properties: ['openDirectory']
      }).then(result => {
        return result.canceled ? null : result.filePaths[0];
      })
    })
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