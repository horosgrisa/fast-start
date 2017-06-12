module.exports = () => {
  require('./build/base')()
  require('./build/config')()
  require('./build/public')()
  require('./build/css')()
  require('./build/img')()
  require('./build/js')()
  require('./build/views')()
}
