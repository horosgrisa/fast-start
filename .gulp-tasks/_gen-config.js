const path = require('path');
const fs = require('fs');

let CONFIG = {};

try {
  fs.accessSync(path.join(__dirname, '..', '.selected'), fs.R_OK);
  CONFIG.src = path.join(
    fs.readFileSync(path.join(__dirname, '..', '.selected'), 'utf8').replace(/\n$/, ''),
    'src',
  );
} catch (err) {
  CONFIG.src = 'example/src';
}

try {
  fs.accessSync(path.join(__dirname, '..', CONFIG.src, '..', 'gulp.json'), fs.R_OK);
  const srcConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', CONFIG.src, '..', 'gulp.json')),
  );
  CONFIG = { ...CONFIG, ...srcConfig };
} catch (err) {}

CONFIG.server = CONFIG.server || false;

if (CONFIG.deploy) {
  CONFIG.deploy.root = path.join(CONFIG.src, '..', 'dist');
  CONFIG.deploy.silent = CONFIG.deploy.silent || true;
  CONFIG.deploy.compress = CONFIG.deploy.compress || true;
}

CONFIG.using = CONFIG.using || {
  path: 'cwd',
  color: 'green',
  filesize: false,
};

CONFIG.dist =
  process.env.NODE_ENV === 'production' ? `${CONFIG.src}/../dist` : `${CONFIG.src}/../build`;

CONFIG.postcss = require(__dirname + '/../.postcssrc.js');
// CONFIG.babel = require(__dirname + '/../.babelrc.js');

if (process.env.NODE_ENV === 'production') {
  CONFIG.postcss.plugins.push(require('cssnano')());
}

module.exports = CONFIG;
