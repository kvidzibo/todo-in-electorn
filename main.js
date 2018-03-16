const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let mainWin

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  console.log('App Is Ready')
  mainWin = new BrowserWindow({width: 1100, height: 1000, x: 0, y: 0})
  mainWin.webContents.openDevTools()
  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWin.on('closed', function () {
    mainWin = null
  })
})

require('./app')
