module.exports = () => {
  require('./fix/css')();
  require('./fix/js')();
  require('./fix/html')();
};
