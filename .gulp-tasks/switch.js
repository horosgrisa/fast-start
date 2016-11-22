'use strict'
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('switch:project', (done) => {
    const dirs = fs.readdirSync(path.join(__dirname, '..'))
      .filter(function (file) {
        return fs.statSync(path.join(__dirname, '..', file))
          .isDirectory()
      })
    let projects = []
    dirs.forEach((dir) => {
      if (dirs[dir] !== '.bin' && dirs[dir] !== '.git' && dirs[dir] !== '.generator' && dirs[dir] !== '.gulp-tasks' && dirs[dir] !== 'node_modules' && dirs[dir] !== '.examples') {
        if (dirs[dir].indexOf('.dist', dirs[dir].length - '.dist'.length) === -1 && dirs[dir].indexOf('.build', dirs[dir].length - '.build'.length) === -1) {
          projects.push(dirs[dir])
        }
      }
    })
    inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'What project do you want to enable?',
        choices: projects
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
