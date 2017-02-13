module.exports = (gulp, $, argv) => {
  require('./lint/css')(gulp, $, argv)
  require('./lint/js')(gulp, $, argv)
  require('./lint/json')(gulp, $, argv)
  require('./lint/html')(gulp, $, argv)
}
