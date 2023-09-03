import * as electron from "electron";
import * as path from "path";
import * as chokidar from "chokidar";
import { BrowserWindow } from "electron";

export const reload =  (window: BrowserWindow) => {
  const styles = path.join(__dirname, '../src/styles');

  const watcher = chokidar.watch(styles);

  electron.app.on('quit', () => {
    watcher.close();
  });

  watcher.on('change', _ => {
    setTimeout(_ => {
      window.webContents.reloadIgnoringCache();
    }, 2000);
  });
  
  
}

