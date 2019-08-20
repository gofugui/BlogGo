import { app, BrowserWindow, ipcMain } from 'electron';
// import store from '../renderer/store'; // eslint-disable-line
// const touchid = require('macos-touchid');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}


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
    mainWindow = null;
  });
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
  const child = new BrowserWindow({ show: false });
  child.loadURL(`${winURL}/editor.html?id=${id}&&time=${time}&&isLock=${isLock}`);
  child.once('ready-to-show', () => {
    child.show();
  });
});

// ipcMain.on('asynchronous-unlock', () => {
//   console.log('asynchronous-unlock');
//   if (process.platform === 'darwin') {
//     try {
//       const canPromptTouchID = systemPreferences.canPromptTouchID();
//       if (!canPromptTouchID) return;
//       systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(() => {
//         console.log('You have successfully authenticated with Touch ID!');
//       }).catch((err) => {
//         console.log(err);
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
// });

