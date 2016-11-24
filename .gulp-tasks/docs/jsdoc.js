'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('docs:jsdoc', (cb) => {
    const jsdoc = require('gulp-jsdoc3')

    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,html,pug}`].concat(global.CONFIG.exclude))
    .pipe(jsdoc({
      'tags': {
        'allowUnknownTags': true,
        'dictionaries': ['jsdoc']
      },
      'source': {
        'include': [`${global.CONFIG.src}/package.json`],
        'includePattern': '.js$',
        'excludePattern': `${global.CONFIG.src}/(node_modules/|docs)`
      },
      'plugins': [
        'plugins/markdown'
      ],
      'templates': {
        'cleverLinks': false,
        'monospaceLinks': true,
        'useLongnameInNav': false
      },
      'opts': {
        'destination': `${global.CONFIG.src}/docs/jsdoc`,
        'encoding': 'utf8',
        'private': true,
        'recurse': true,
        'template': './node_modules/minami'
      }
    }, cb))
  })
}
