import { app, BrowserWindow, Menu,systemPreferences } from 'electron' // eslint-disable-line

import store from '../renderer/store';
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
    height: 900,
    useContentSize: true,
    minWidth: 1300,
    minHeight: 387,
    fullscreenWindowTitle: true,
    autoHideMenuBar: true,
    backgroundColor: '#272c37',
    width: 1300,

    darkTheme: true,
    titleBarStyle: 'hidden',
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

app.on('browser-window-blur', () => {
  store.commit('app/setAppState', false);
});

app.on('browser-window-focus', () => {
  store.commit('app/setAppState', true);
});
