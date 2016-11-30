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
  const srcConfig = require(path.join(__dirname, '..', CONFIG.src, 'gulp.json'))
  CONFIG = Object.assign(CONFIG, srcConfig)
} catch (err) {
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

CONFIG.postcssPlugins = [
  require('postcss-import')(),
  require('postcss-mixins')(),
  require('postcss-nested-ancestors')(),
  require('postcss-nested')(),
  require('postcss-property-lookup')(),
  require('rucksack-css')(),
  require('postcss-cssnext')({
    warnForDuplicates: false
  })
]
if (argv.production) {
  CONFIG.postcssPlugins[CONFIG.postcssPlugins.length] = require('cssnano')()
}

CONFIG.rollupPlugins = [
  require('rollup-plugin-json')(),
  require('rollup-plugin-buble')(),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-node-globals')(),
  require('rollup-plugin-node-resolve')({
    browser: true,
    main: true
  })
]
if (argv.production) {
  CONFIG.rollupPlugins[CONFIG.rollupPlugins.length] = require('rollup-plugin-uglify')()
}

module.exports = CONFIG
