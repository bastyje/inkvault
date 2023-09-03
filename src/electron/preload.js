const { contextBridge, ipcRenderer } = require("electron");



contextBridge.exposeInMainWorld(
  "api", {
    windowManipulation: {
      close: _ => { ipcRenderer.send('close') },
      minimize: _ => { ipcRenderer.send('minimize') },
      maximize: _ => { ipcRenderer.send('maximize') }
    },
    fs: {
      getFilesList: (root, relative) => {
        return ipcRenderer.invoke('get-files-list', {
          root: root,
          relative: relative
        })
      },
      getFileTree: root => {
        return ipcRenderer.invoke('get-file-tree', {
          root: root
        });
      },
      readFile: (root, relative) => {
        return ipcRenderer.invoke('read-file', {
          root: root,
          relative: relative
        });
      },
      writeFile: (path, content) => {
        ipcRenderer.send('write-file', path, content);
      },
      selectFromFileDialog: _ => {
        return ipcRenderer.invoke('select-from-file-dialog');
      }
    },
    webauthnKey: {
      getKeys: root => {
        return ipcRenderer.invoke('get-keys', {
          root: root
        })
      },
      createLocal: (root, keyInfo) => {
        ipcRenderer.send('create-local-webauthn-key', root, keyInfo)
      },
      createGlobal: (root, keyInfo) => {
        ipcRenderer.send('create-global-webauthn-key', root, keyInfo)
      }
    },
    events: {
      onFileChanged: (path, callback) => ipcRenderer.on('file-changed', callback)
    }
  }
);