const watch = require('node-watch')
const { app } = require('electron')

let mainWindow

app.once('browser-window-created', (e, browserWindow) => {
  mainWindow = browserWindow
})

watch(['./app', './main.js', './main-dev.js'], {
  recursive: true
}, () => {
  process.exit(0)
})

watch('./static', {
  recursive: true
}, () => {
  if (mainWindow.reload) {
    mainWindow.reload()
  }
})

require('./main')
