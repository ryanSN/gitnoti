const {app, BrowserWindow, ipcMain, Tray} = require('electron')
const electron = require('electron')
const path = require('path')

// const assetsDir = path.join(__dirname, 'assets')

let tray
let mainWindow
let screenElectron
// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  screenElectron = electron.screen
  // Setup the menubar with an icon
  let icon
  if (process.platform === 'win32') {
    icon = path.join(__dirname, '../resources/trayicon.ico')
  } else {
    icon = path.join(__dirname, '../resources/trayicon.png')
  }
  tray = new Tray(icon)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({mode: 'detach'})
    }
  })

  // Make the popup window for the menubar
  mainWindow = new BrowserWindow({
    width: 300,
    height: 350,
    show: false,
    frame: false,
    resizable: true
  })

  // Tell the popup window to load our index.html file
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  mainWindow.webContents.openDevTools()

  // Only close the window on blur if dev tools isn't opened
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })

  if (process.platform !== 'win23') {
    tray.setHighlightMode('always')

    mainWindow.on('show', () => {
      tray.setHighlightMode('always')
    })

    mainWindow.on('hide', () => {
      tray.setHighlightMode('never')
    })
  }
})

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = mainWindow.getBounds()
  const mainScreen = screenElectron.getPrimaryDisplay()
  let x = 0
  let y = 0
  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    // handle if user has dual monitors, to prevent bleeding off the edge
    // move to the edge of the monitor if thats that case
    x = Math.round((trayPos.x + windowPos.width) > mainScreen.size.width ? mainScreen.size.width - windowPos.width : trayPos.x)
    y = Math.round(trayPos.y - windowPos.height)
  }

  mainWindow.setPosition(x, y, false)
  mainWindow.show()
  mainWindow.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
