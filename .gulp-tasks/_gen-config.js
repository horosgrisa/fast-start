const argv = require('yargs').argv
const path = require('path')
const fs = require('fs')

let CONFIG = {}

try {
  fs.accessSync(path.join(__dirname, '..', '.selected'), fs.R_OK)
  CONFIG.src = fs.readFileSync(path.join(__dirname, '..', '.selected'), 'utf8').replace(/\n$/, '')
} catch (err) {
  CONFIG.src = 'example'
}

try {
  fs.accessSync(path.join(__dirname, '..', CONFIG.src, 'gulp.json'), fs.R_OK)
  const srcConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', CONFIG.src, 'gulp.json')))
  CONFIG = Object.assign(CONFIG, srcConfig)
} catch (err) {
  CONFIG = Object.assign(CONFIG, {})
}

CONFIG.server = CONFIG.server || false

if (CONFIG.deploy) {
  CONFIG.deploy.root = `${CONFIG.src}.build`
  CONFIG.deploy.silent = CONFIG.deploy.silent || true
  CONFIG.deploy.compress = CONFIG.deploy.compress || true
}

CONFIG.using = CONFIG.using || {
  path: 'cwd',
  color: 'green',
  filesize: false
}

CONFIG.dist = argv.production ? `${CONFIG.src}.build` : `${CONFIG.src}.dist`

CONFIG.exclude = [
  `!${CONFIG.src}/gulp.json`,
  `!${CONFIG.src}/.git/**`,
  `!${CONFIG.src}/.git`,
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
  require('postcss-smart-import')(),
  require('postcss-mixins')(),
  require('postcss-each')(),
  require('postcss-for')(),
  require('postcss-simple-vars')(),
  require('postcss-nested-ancestors')(),
  require('postcss-nested')(),
  require('postcss-property-lookup')(),
  require('postcss-extend')(),
  require('rucksack-css')(),
  require('postcss-cssnext')({
    warnForDuplicates: false
  })
]
if (argv.production) {
  CONFIG.postcssPlugins.push(require('cssnano')())
}

CONFIG.rollupPlugins = [
  require('rollup-plugin-json')(),
  require('rollup-plugin-buble')({
    jsx: CONFIG.jsxPragma,
    objectAssign: 'Object.assign'
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-node-globals')(),
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
