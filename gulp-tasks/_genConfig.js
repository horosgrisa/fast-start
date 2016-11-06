'use strict'
const argv = require('yargs').argv
const path = require('path')
const fs = require('fs')

let CONFIG = {}

try {
  require('fs').accessSync(path.join('..', __dirname, '.selected'), fs.R_OK)
  CONFIG.src = fs.readFileSync(path.join('..', __dirname, '.selected'), 'utf8').replace(/\n$/, '')
} catch (e) {
  CONFIG.src = 'example'
}

try {
  require('fs').accessSync(path.join('..', __dirname, CONFIG.src, 'gulp.json'), fs.R_OK)
  let srcConfig = require(path.join('..', __dirname, CONFIG.src, 'gulp.json'))
  for (var attrname in srcConfig) {
    CONFIG[attrname] = srcConfig[attrname]
  }
} catch (e) {
}

CONFIG.browserify = CONFIG.browserify || true
CONFIG.server = CONFIG.server || false

if (CONFIG.deploy) {
  CONFIG.deploy.root = './build'
  CONFIG.deploy.silent = CONFIG.deploy.silent || true
  CONFIG.deploy.compress = CONFIG.deploy.compress || true
}

CONFIG.using = CONFIG.using || {
  path: 'relative',
  color: 'green',
  filesize: false
}

CONFIG.dist = !argv.production ? './dist' : './build'

module.exports = CONFIG
