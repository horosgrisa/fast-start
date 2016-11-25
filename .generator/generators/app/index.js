'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var fs = require('fs-extra')
var mkdirp = require('mkdirp')

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      `Install ${chalk.red('fast-start')}!`
    ))

    var prompts = [{
      type: 'input',
      name: 'project',
      message: 'What is project name',
      default: 'Example'
    }, {
      type: 'input',
      name: 'server',
      message: 'What is type of site (node, php or static)',
      default: 'static',
      validate: (server) => {
        return (server === 'node' || server === 'php' || server === 'static')
      }
    }, {
      type: 'confirm',
      name: 'deploy',
      message: 'Enable rsync deploy?',
      default: true
    }, {
      type: 'input',
      name: 'hostname',
      message: 'SSH hostname',
      default: '',
      when: function (props) {
        return props.deploy
      }
    }, {
      type: 'input',
      name: 'username',
      message: 'SSH username',
      default: '',
      when: function (props) {
        return props.deploy
      }
    }, {
      type: 'input',
      name: 'destination',
      message: 'SSH path',
      default: '/var/www/project',
      when: function (props) {
        return props.deploy
      }
    }, {
      type: 'confirm',
      name: 'skeleton',
      message: 'Create scaffolding for project?',
      default: true
    }]

    return this.prompt(prompts).then(function (props) {
      this.props = this.props || {}
      this.props = props
    }.bind(this))
  },

  writing: function () {
    var done = this.async()
    var that = this
    this.spawnCommand('git', ['clone', 'https://github.com/horosgrisa/fast-start.git', '.']).on('close', function () {
      console.log(that.destinationPath(that.props.project))
      if (that.props.skeleton) {
        try {
          fs.copySync(that.destinationPath('.examples/base'), that.destinationPath(that.props.project))
        } catch (err) {
          console.error(err)
        }
      } else {
        mkdirp(that.destinationPath(that.props.project))
      }
      var project = that.props.project
      delete that.props.skeleton
      delete that.props.project
      if (that.props.server === 'static') {
        that.props.server = false
      }
      fs.writeFileSync(that.destinationPath(`${project}/gulp.json`), JSON.stringify(that.props, null, 2))
      done()
    })
  },

  install: function () {
    this.installDependencies({bower: false, npm: true})
  },

  end: function () {
    this.log(`Now you can run \`${chalk.green('gulp')}\` for compiling, \`${chalk.green('gulp lint')}\` for linting and \`${chalk.green('gulp fix')}\` for fixing and beautifing of your code`)
    this.log(`Use ${chalk.green('--production')} for production build, ${chalk.green('--all')} for build all files, ${chalk.green('gulp deploy')} for deploy`)
    process.exit()
  }
})
