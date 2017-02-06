const path = require('path')
const {BrowserWindow} = require('electron')

class TrayWindow {
  constructor () {
    let htmlPath = 'file://' + path.join(__dirname, '/index.html')

    //  Creation of the new wwindow
    this.window = new BrowserWindow({
      show: false, // inititall hide it so we can remove blink
      height: 210,
      width: 225,
      frame: false,
      backgroundColor: '#E4ECEF',
      resizeable: false
    })

    this.window.loadURL(htmlPath)

    this.window.on('blur', () => {
      this.window.hide()
    })
  }
}

module.exports = TrayWindow
