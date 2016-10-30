// / If you using browserify, uncomment following lines
// module.exports = function () {
const genYear = function () {
  const year = new Date()
    .getFullYear()
  return `${year}`
}

document.getElementById('year')
  .innerHTML = genYear()
  // }
