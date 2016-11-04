'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var fs = require('fs')

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Install ' + chalk.red('fast-start') + '!'
    ))

    var prompts = [{
      type: 'confirm',
      name: 'server',
      message: 'Enable server (if disabled then will be used static site)',
      default: true
    }, {
      type: 'confirm',
      name: 'browserify',
      message: 'Enable browserify (if disabled then will be used `gulp-include`)',
      default: true
    }, {
      type: 'input',
      name: 'dist',
      message: 'Dist path',
      default: './dist'
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
      default: '~/dist/',
      when: function (props) {
        return props.deploy
      }
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
      that.config = JSON.parse(fs.readFileSync(that.destinationPath('config.example.json')))
      that.config.server = that.props.server || true
      that.config.browserify = that.props.browserify || true
      that.config.dist = that.props.dist || './dist'
      if (that.props.deploy) {
        that.config.deploy = that.config.deploy || {}
        that.config.deploy.hostname = that.props.hostname || true
        that.config.deploy.username = that.props.username || true
        that.config.deploy.destination = that.props.destination || true
      } else {
        that.config.deploy = false
      }
      fs.writeFileSync(that.destinationPath('config.json'), JSON.stringify(that.config, null, 2))
      done()
    })
  },

  install: function () {
    this.installDependencies({bower: false, npm: true})
  },

  end: function () {
    this.log('Now you can run `' + chalk.green('gulp') + '` for compiling, `' + chalk.green('gulp lint') + '` for linting and `' + chalk.green('gulp fix') + '` for fixing and beautifing of your code')
    this.log('Use ' + chalk.green('--production') + ' for production build, ' + chalk.green('--all') + ' for build all files, ' + chalk.green('--deploy') + ' for deploy')
    process.exit()
  }
})
