const genCopyright = function () {
  const year = new Date()
    .getFullYear()
  return `Grigorii Horos © ${year}`
}

document.getElementById('copyright')
  .innerHTML = genCopyright()
