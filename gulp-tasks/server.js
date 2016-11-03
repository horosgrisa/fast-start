'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./server/node')(gulp)
  require('./server/bs')(gulp)
}
