module.exports = (gulp, $, argv) => {
  require('./fix/css')(gulp, $, argv)
  require('./fix/js')(gulp, $, argv)
  require('./fix/json')(gulp, $, argv)
  require('./fix/html')(gulp, $, argv)
}
