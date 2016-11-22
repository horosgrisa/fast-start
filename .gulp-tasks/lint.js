'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  require('./lint/css')(gulp, plumber, using, gIf, touch)
  require('./lint/js')(gulp, plumber, using, gIf, touch)
  require('./lint/json')(gulp, plumber, using, gIf, touch)
  require('./lint/pug')(gulp, plumber, using, gIf, touch)
  require('./lint/html')(gulp, plumber, using, gIf, touch)
  require('./lint/todo')(gulp, plumber, using, gIf, touch)
}
