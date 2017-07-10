const ipcRenderer = require('electron').ipcRenderer;

window.winssb = {
  teams: {
    didSignIn(...args) {
      ipcRenderer.send('did-sign-in', ...args);
    }
  }
};
