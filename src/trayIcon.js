const path = require('path')
const { Tray } = require('electron')
const platform = require('os').platform()
// Electron-positioner - npm package for positioning of the Tray Window.
// Our Tray Window should appear under the Tray icon.

const Positioner = require('electron-positioner')

class TrayIcon {
  constructor (trayWindow) {
    // Path to the app icon that will be displayed in the Tray (icon size: 22px)

    let iconPath = null
    if (platform === 'win32') {
      iconPath = path.join(__dirname, '../images/trayicon.ico')
    } else {
      iconPath = path.join(__dirname, '../images/trayicon.png')
    }

    console.log(platform)
    console.log(iconPath)
    this.trayIcon = new Tray(iconPath)
    this.trayIcon.setToolTip('GitNoti')
    // By clicking on the icon we have to show TrayWindow and position it in the middle
    // under the tray icon (initialy this window is hidden).
    this.trayIcon.on('click', (e, bounds) => {
      if (trayWindow.isVisible()) {
        trayWindow.hide()
      } else {
        let positioner = new Positioner(trayWindow)
        positioner.move('trayCenter', bounds)
        trayWindow.show()
      }
    })
  }
}

module.exports = TrayIcon
