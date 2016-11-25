'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

module.exports = function (gulp, $, argv) {
  gulp.task('switch:project', (done) => {
    const sysDirs = ['.bin', '.git', '.generator', '.gulp-tasks', 'node_modules', '.examples']
    const dirs = fs.readdirSync(path.join(__dirname, '..')).filter(function (file) {
      return fs.statSync(path.join(__dirname, '..', file)).isDirectory() && sysDirs.indexOf(file) === -1
    })
    inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'What project do you want to enable?',
        choices: dirs
      }
    ]).then(function (answers) {
      fs.writeFileSync(path.join(__dirname, '..', '.selected'), answers.project)
      console.log(`Project ${answers.project} selected`)
      done()
    })
    process.on('SIGINT', () => {
      console.log('bye!')
      done()
    })
  })
}
