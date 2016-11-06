'use strict'
const $ = require('gulp-load-plugins')()
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

module.exports = function (gulp) {
  gulp.task('select', (done) => {
    let modules = {}
    const dirs = fs.readdirSync(path.join(__dirname, '..'))
      .filter(function (file) {
        return fs.statSync(path.join(__dirname, '..', file))
          .isDirectory()
      })
    let index
    index = dirs.indexOf('.git')
    dirs.splice(index, 1)
    index = dirs.indexOf('build')
    dirs.splice(index, 1)
    index = dirs.indexOf('dist')
    dirs.splice(index, 1)
    index = dirs.indexOf('.generator')
    dirs.splice(index, 1)
    index = dirs.indexOf('gulp-tasks')
    dirs.splice(index, 1)

    inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'What project do you want to enable?',
        choices: dirs
      }
    ]).then(function (answers) {
      fs.writeFileSync(path.join(__dirname, '..', '.selected'), answers.project)
      console.log('Project ' + answers.project + ' selected')
    })

    done()
  })
}
