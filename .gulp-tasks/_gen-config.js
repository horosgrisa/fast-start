'use strict'
const argv = require('yargs').argv
const path = require('path')
const fs = require('fs')

let CONFIG = {}

try {
  require('fs').accessSync(path.join(__dirname, '..', '.selected'), fs.R_OK)
  CONFIG.src = fs.readFileSync(path.join(__dirname, '..', '.selected'), 'utf8').replace(/\n$/, '')
} catch (err) {
  CONFIG.src = 'example'
}

try {
  require('fs').accessSync(path.join(__dirname, '..', CONFIG.src, 'gulp.json'), fs.R_OK)
  let srcConfig = require(path.join(__dirname, '..', CONFIG.src, 'gulp.json'))
  CONFIG = Object.assign(CONFIG, srcConfig)
} catch (err) {
  throw err
}

CONFIG.server = CONFIG.server || false

if (CONFIG.deploy) {
  CONFIG.deploy.root = `${CONFIG.src}/build`
  CONFIG.deploy.silent = CONFIG.deploy.silent || true
  CONFIG.deploy.compress = CONFIG.deploy.compress || true
}

CONFIG.using = CONFIG.using || {
  path: 'relative',
  color: 'green',
  filesize: false
}

CONFIG.dist = !argv.production ? `${CONFIG.src}/dist` : `${CONFIG.src}/build`

CONFIG.exclude = [
  `!${CONFIG.src}/gulp.json`,
  `!${CONFIG.src}/.git/**`,
  `!${CONFIG.src}/.git`,
  `!${CONFIG.src}/dist/**`,
  `!${CONFIG.src}/dist`,
  `!${CONFIG.src}/build/**`,
  `!${CONFIG.src}/build`,
  `!${CONFIG.src}/tests/**`,
  `!${CONFIG.src}/tests`,
  `!${CONFIG.src}/docs/**`,
  `!${CONFIG.src}/docs`,
  `!${CONFIG.src}/node_modules/**`,
  `!${CONFIG.src}/node_modules`,
  `!${CONFIG.src}/bower_components/**`,
  `!${CONFIG.src}/bower_components`
]

module.exports = CONFIG
