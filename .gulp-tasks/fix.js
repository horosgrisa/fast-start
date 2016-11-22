'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  require('./fix/css')(gulp, plumber, using, gIf, touch)
  require('./fix/js')(gulp, plumber, using, gIf, touch)
  require('./fix/json')(gulp, plumber, using, gIf, touch)
  require('./fix/html')(gulp, plumber, using, gIf, touch)
}
