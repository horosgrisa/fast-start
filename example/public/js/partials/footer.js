// / If you using browserify, uncomment following lines
// module.exports = function () {
const genCopyright = function () {
  const year = new Date()
    .getFullYear()
  return `<a href="https://github.com/horosgrisa/fast-start">Fast Start</a> – ${year}`
}

document.getElementById('copyright')
  .innerHTML = genCopyright()
  // }
