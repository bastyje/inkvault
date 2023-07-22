const { app, BrowserWindow, protocol, net } = require('electron')
const url = require('url')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('http://localhost/index.html')
}

app.commandLine.appendSwitch('enable-experimental-web-platform-features');

app.whenReady().then(() => {
  // protocol.interceptFileProtocol('http', (request, callback) => {
  //   const { host, pathname } = url.parse(request.url);
  //
  //   if (host === 'localhost') {
  //     callback({ path: path.normalize(`${__dirname}/${pathname}`) });
  //   } else {
  //     // all requests to http except localhost will be lost...
  //     callback();
  //   }
  // }, (error) => {
  //   if (error) console.error('Failed to register protocol')
  // });
  protocol.handle('http', request => {
    const { host, pathname } = url.parse(request.url);
    if (host === 'localhost') {
      const filepath = request.url.slice('http://localhost'.length);
      return net.fetch(url.pathToFileURL(path.join(__dirname, filepath)).toString());
    }
    return net.fetch(request);
  });

  createWindow();
})