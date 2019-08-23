import { app, BrowserWindow, ipcMain, systemPreferences } from 'electron';
import store from '../renderer/store'; // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

const childWindow = {};
let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;
// const frame = process.platform === 'darwin';
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({

    useContentSize: true,
    fullscreenWindowTitle: true,
    autoHideMenuBar: true,
    backgroundColor: '#272c37',
    width: 830,
    minWidth: 550,
    height: 900,
    minHeight: 387,
    darkTheme: true,

    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      scrollBounce: true,
    },
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    if (childWindow) {
      Object.values(childWindow).forEach(item => item.close());
    }
    mainWindow = null;
  });
  // mainWindow.once('ready-to-show', () => {
  //   let canUseTouchBar = false;
  //   if (process.platform === 'darwin' && systemPreferences.canPromptTouchID()) {
  //     canUseTouchBar = true;
  //   }

  //   store.dispatch('app/init', { canUseTouchBar, isUnLock: false });
  // });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('asynchronous-message', (event, args) => {
  const { time, id, isLock } = args;
  if (childWindow[id]) {
    const win = childWindow[id];
    win.restore();
    return;
  }
  const child = new BrowserWindow({
    show: false,
    backgroundColor: '#272c37',
    darkTheme: true,
    minWidth: 550,
    minHeight: 387,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      scrollBounce: true,
    },
  });
  child.loadURL(`${winURL}/editor.html?id=${id}&&time=${time}&&isLock=${isLock}`);
  child.once('ready-to-show', () => {
    child.show();
  });
  child.once('closed', () => {
    childWindow[id] = null;
  });
  childWindow[id] = child;
});

/**
 * type:事件类型
 * params
 */
ipcMain.on('asynchronous-touchBar', async (event, { type, tipInfo, params }) => {
  if (process.platform === 'darwin') {
    try {
      const canPromptTouchID = systemPreferences.canPromptTouchID();
      if (!canPromptTouchID) return;
      const [error, res] = await systemPreferences.promptTouchID(tipInfo)
        .then(() => [null, true]).catch(err => [err, null]);
      if (!error) {
        if (res) {
          store.dispatch(type, params);
          // console.log('You have successfully authenticated with Touch ID!');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
});

// ipcMain.on('asynchronous-init', () => {
//   let canUseTouchBar = false;
//   if (process.platform === 'darwin' && systemPreferences.canPromptTouchID()) {
//     canUseTouchBar = true;
//   }
//   console.log(canUseTouchBar);
//   store.dispatch('app/init', { canUseTouchBar, isUnLock: false });
// });
