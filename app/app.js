const electron = require('electron');

const app = electron.app;

var BrowserWindow = electron.BrowserWindow;

let mainWindow;

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database.sqlite');

//***//
const globalShortcut = electron.globalShortcut;
//***//
function createWindow () {
	//***//
	globalShortcut.register('f5', function() {
		console.log('f5 is pressed');
		mainWindow.reload();
	})
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed');
		mainWindow.reload();
	})
}

// Context menu for your Electron app
const contextMenu = require('electron-context-menu')

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
      {
          label: 'Rainbow',
          // Only show it when right-clicking images
          visible: params.mediaType === 'image'
      },
      {
          label: 'Search Google for “{selection}”',
          // Only show it when right-clicking text
          visible: params.selectionText.trim().length > 0,
          click: () => {
              shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
          }
      }
  ]
});

app.on('window-all-closed', function () {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    
    db.close();
    mainWindow = null;
  });
});