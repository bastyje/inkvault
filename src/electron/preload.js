const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    windowManipulation: {
      close: _ => { ipcRenderer.send('close'); },
      minimize: _ => { ipcRenderer.send('minimize'); },
      maximize: _ => { ipcRenderer.send('maximize'); }
    },
    fs: {
      getFileTree: path => {
        return ipcRenderer.invoke('get-file-tree', { path });
      },
      readFile: path => {
        return ipcRenderer.invoke('read-file', { path });
      },
      readEncryptedFile: path => {
        return ipcRenderer.invoke('read-encrypted-file', { path });
      },
      writeFile: (path, content) => {
        return ipcRenderer.invoke('write-file', { path, content });
      },
      writeEncryptedFile: (encryptionInfo, path) => {
        return ipcRenderer.invoke('write-encrypted-file', { encryptionInfo, path });
      },
      createNewVault: (path, name) => {
        return ipcRenderer.invoke('create-new-vault', {path, name});
      },
      getPreviouslyOpenedVault: _ => {
        return ipcRenderer.invoke('get-previously-opened-vault');
      },
      getAllVaultsFromComputer: _ => {
        return ipcRenderer.invoke('get-all-vaults-from-computer');
      },
      getPathFromModal: _ => {
        return ipcRenderer.invoke('get-path-from-modal');
      }
    },
    webauthnKey: {
      getKey: (root, keyName) => {
        return ipcRenderer.invoke('get-key', { root, keyName });
      },
      getKeys: root => {
        return ipcRenderer.invoke('get-keys', { root });
      },
      createLocal: (root, keyInfo) => {
        return ipcRenderer.invoke('create-local-webauthn-key', { root, keyInfo });
      },
      createGlobal: (root, keyInfo) => {
        return ipcRenderer.invoke('create-global-webauthn-key', { root, keyInfo });
      }
    },
    events: {
      onFileChanged: (path, callback) => ipcRenderer.on('file-changed', callback)
    }
  }
);