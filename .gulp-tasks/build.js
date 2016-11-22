'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  require('./build/base')(gulp, plumber, using, gIf, touch)
  require('./build/css')(gulp, plumber, using, gIf, touch)
  require('./build/fonts')(gulp, plumber, using, gIf, touch)
  require('./build/img')(gulp, plumber, using, gIf, touch)
  require('./build/js')(gulp, plumber, using, gIf, touch)
  require('./build/pug')(gulp, plumber, using, gIf, touch)
  require('./build/html')(gulp, plumber, using, gIf, touch)
  require('./build/njk')(gulp, plumber, using, gIf, touch)
}

