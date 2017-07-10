import { app, BrowserWindow, BrowserView, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

let mainWindow;
let browserViews = {};
let teamUrls = [
  'https://electronhq.slack.com/messages',
  'https://sfutes.slack.com/messages',
  'https://atomio.slack.com/messages'
];

const sidebarWidth = 72;
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({strategy: 'react-hmr'});

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden'
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setBrowserViewForUrl(teamUrls[0]);

  ipcMain.on('team-switch', (e, index) => {
    setBrowserViewForUrl(teamUrls[index]);
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

function setBrowserViewForUrl(url) {
  if (browserViews[url]) {
    setBrowserView(browserViews[url]);
    return;
  }

  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  });

  setBrowserView(view);
  view.webContents.loadURL(url);
  browserViews[url] = view;
}

function setBrowserView(view) {
  mainWindow.setBrowserView(view);

  const [width, height] = mainWindow.getSize();

  view.setBounds({
    x: sidebarWidth,
    y: 0,
    width: width - sidebarWidth,
    height: height
  });

  view.setAutoResize({
    width: true,
    height: true
  });

  view.webContents.focus();
}
