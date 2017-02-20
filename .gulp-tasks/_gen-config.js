const argv = require('yargs').argv
const path = require('path')
const fs = require('fs')

let CONFIG = {}

try {
  fs.accessSync(path.join(__dirname, '..', '.selected'), fs.R_OK)
  CONFIG.src = path.join(fs.readFileSync(path.join(__dirname, '..', '.selected'), 'utf8').replace(/\n$/, ''), 'src')
} catch (err) {
  CONFIG.src = 'example/src'
}

try {
  fs.accessSync(path.join(__dirname, '..', CONFIG.src, '..', 'gulp.json'), fs.R_OK)
  const srcConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', CONFIG.src, '..', 'gulp.json')))
  CONFIG = Object.assign(CONFIG, srcConfig)
} catch (err) {
  CONFIG = Object.assign(CONFIG, {})
}

CONFIG.server = CONFIG.server || false

if (CONFIG.deploy) {
  CONFIG.deploy.root = path.join(CONFIG.src, '..', 'dist')
  CONFIG.deploy.silent = CONFIG.deploy.silent || true
  CONFIG.deploy.compress = CONFIG.deploy.compress || true
}

CONFIG.using = CONFIG.using || {
  path: 'cwd',
  color: 'green',
  filesize: false
}

CONFIG.dist = argv.production ? `${CONFIG.src}/../dist` : `${CONFIG.src}/../build`

CONFIG.postcssPlugins = [
  require('postcss-use')({
    modules: []
  }),
  require('postcss-smart-import')(),
  require('postcss-nested')(),
  require('postcss-cssnext')({
    warnForDuplicates: false
  })
]
if (argv.production) {
  CONFIG.postcssPlugins.push(require('cssnano')())
}

CONFIG.rollupPlugins = [
  require('rollup-plugin-json')(),
  require('rollup-plugin-babel')({runtimeHelpers: true}),
  require('rollup-plugin-node-resolve')({
    module: true,
    browser: true,
    jsnext: true,
    main: true,
    extensions: ['.js', '.json', '.jsx']
  })
]
if (argv.production) {
  CONFIG.rollupPlugins.push(require('rollup-plugin-strip')({
    functions: ['console.*', 'assert.*', 'debug']
  }))
  CONFIG.rollupPlugins.push(require('rollup-plugin-uglify')())
}

module.exports = CONFIG
