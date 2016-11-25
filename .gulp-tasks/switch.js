'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

module.exports = function (gulp, $, argv) {
  gulp.task('switch:project', (done) => {
    const dirs = fs.readdirSync(path.join(__dirname, '..')).filter(function (file) {
      if (file !== '.bin' && file !== '.git' && file !== '.generator' && file !== '.gulp-tasks' && file !== 'node_modules' && file !== '.examples') {
        return fs.statSync(path.join(__dirname, '..', file)).isDirectory()
      }
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
