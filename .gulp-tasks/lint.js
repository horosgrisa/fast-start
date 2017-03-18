module.exports = () => {
  require('./lint/css')()
  require('./lint/js')()
  require('./lint/html')()
}
