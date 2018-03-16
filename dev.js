const watch = require('node-watch')
const spawn = require('child_process').spawn
const webpack = require('webpack')
const dev = require('./config/webpack.config.dev')

const initElectron = () => {
  spawn('./node_modules/.bin/electron', ['./main-dev.js'], {stdio: [ process.stdin, process.stdout, process.stderr ]})
}
initElectron()

watch(['./app', './main.js', './main-dev.js'], {
  recursive: true
}, () => {
  initElectron()
})

const compiler = webpack(dev)

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }
  console.log(stats.toString({
    chunks: false,
    colors: true
  }))
})
