const {app, BrowserWindow, ipcMain, Tray} = require('electron')
const electron = require('electron')
const path = require('path')

// const assetsDir = path.join(__dirname, 'assets')

let tray
let window
let screenElectron
// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  screenElectron = electron.screen
  // Setup the menubar with an icon
  let icon = path.resolve(__dirname, '../images/trayicon.png')
  tray = new Tray(icon)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })

  // Make the popup window for the menubar
  window = new BrowserWindow({
    width: 300,
    height: 350,
    show: false,
    frame: false,
    resizable: true
  })

  // Tell the popup window to load our index.html file
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`)

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
})

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
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

  window.setPosition(x, y, false)
  window.show()
  window.focus()
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
