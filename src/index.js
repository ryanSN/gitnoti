const {app, BrowserWindow, ipcMain, Tray} = require('electron')
const electron = require('electron')
const path = require('path')
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

let mainWindow

const start = () => {
  let tray
  let screenElectron

  process.on('uncaughtException', e => {
    console.log('Uncaught exception on main thread:', e)
  })

  // create main window
  const MainWindow = () => {
    // Make the popup window for the menubar
    mainWindow = new BrowserWindow({
      width: 320,
      height: 350,
      show: false,
      frame: false,
      resizable: true,
      animate: true
    })

    // Tell the popup window to load our index.html file
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
    mainWindow.webContents.openDevTools()
  }

  const toggleWindow = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      showWindow()
    }
  }

  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // Called when the user clicks the dock icon
  app.on('activate', () => {
    mainWindow && mainWindow.show(true)
  })

  app.on('close-windows', event => {
    const windows = BrowserWindow.getAllWindows()
    windows.forEach(w => {
      // We tell it to close, we can register handlers for the 'close' event if we want to
      // keep this window alive or hide it instead.
      w.close()
    })
  })

  // This method is called once Electron is ready to run our code
  // It is effectively the main method of our Electron app
  app.once('ready', () => {
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))

    screenElectron = electron.screen

    MainWindow()

    mainWindow.on('blur', () => {
      if (!mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.hide()
      }
    })

    mainWindow.setVisibleOnAllWorkspaces(true)

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
    // Only close the window on blur if dev tools isn't opened
  })

  const showWindow = () => {
    const trayPos = tray.getBounds()
    const windowPos = mainWindow.getBounds()
    const mainScreen = screenElectron.getPrimaryDisplay()
    let x = 0
    let y = 0
    if (process.platform === 'darwin') {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
      y = Math.round(trayPos.y + trayPos.height + 15)
    } else {
      // handle if user has dual monitors, to prevent bleeding off the edge
      // move to the edge of the monitor if thats that case
      x = Math.round((trayPos.x + windowPos.width) > mainScreen.size.width ? mainScreen.size.width - windowPos.width : trayPos.x)
      y = Math.round(trayPos.y - windowPos.height - 15)
    }

    mainWindow.setPosition(x, y, false)
    mainWindow.show()
    mainWindow.focus()
  }

  ipcMain.on('show-window', () => {
    showWindow()
  })
}

start()
