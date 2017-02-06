'use strict'

const electron = require('electron')
const {app, ipcMain} = electron
const TrayWindow = require('./TrayWindow')
const TrayIcon = require('./trayIcon')

let tray = null
let trayIcon = null

app.on('ready', () => {
  tray = new TrayWindow()
  trayIcon = new TrayIcon(tray.window)
})

ipcMain.on('quit-app', () => {
  tray.window.close()
  app.quit
})
