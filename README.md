# This is framework for create and compiling of your site
## Features

*   Nodejs run with nodemon
*   Static server with browsersync
*   Live code reload with nodemon and/or browsersync
*   Deploy with rsync
*   Pug or HTML templates
*   Pug compilation
*   HTML compilation (`gulp-include`) as fallback
*   Browserify support
*   JavaScript compilation with gulp-include as fallback
*   Babel for JavaScript
*   Uglify code for production
*   Postcss support (precss and postcss-cssnext)
*   CSS minimization with cssmin
*   Sourcemaps support for JavaScript and CSS
*   Image compress with imagemin
*   CSS lint with stylelint
*   CSS fix with stylefmt and postcss-sorting
*   JavaScript lint with eslint
*   JavaScript fix with eslint and js-beautify
*   HTML lint with htmllint
*   HTML prettify with html-prettify
*   Pug lint with pug-lint

## Project Structure

### File tree

<pre>src
├── package.json
├── bower.json
├── index.js
├── lib/
├── routes/
├── public/
│   ├── js/
│   │   ├── includes/
│   │   ├── partials/
│   │   └── views/
│   ├── css/
│   │   ├── includes/
│   │   ├── partials/
│   │   └── views/
│   ├── font/
│   └── img/
└── views/
   ├── partials/
   └── templates/</pre>

### Description

<dl>

<dt>package.json</dt>

<dd>File with npm deps</dd>

<dt>bower.json</dt>

<dd>File with bower deps</dd>

<dt>index.js</dt>

<dd>Main file of your Nodejs project. This script will be called by nodemon when you run `gulp`.
If you make static site, you don't need this file.</dd>

<dt>lib/</dt>

<dd>Your JavaScript code for backend
If you make static site, you don't need this folder.</dd>

<dt>routes/</dt>

<dd>This folder good to use for scripts they used for define routes for you site</dd>

<dt>public/</dt>

<dd>This folder be routed as '/public' with Browsersync or, if you use own server, you need make this folder accesible as `/public`</dd>

<dt>public/{js,css}/*</dt>

<dd>Will be good if you will use this files as main scripts/styles for your site</dd>

<dt>public/*/views/*</dt>

<dd>Will be good if you will use this files for some routes, for example
`views/index.css -> /`
`views/about.css -> /about`</dd>

<dt>public/*/includes</dt>

<dd>Will be good if you will use this files for including in main files
Example of JavaScript including
const $ = require('jquery') // If you use Browserify
//=require includes/somefile.js // If you use fallback `gulp-include`
Example of CSS including
@import 'includes/somefile'; /* This import in your css includes/_somefile.css */</dd>

<dt>public/*/partials</dt>

<dd>This folder similar to includes/, but will be good if you will use this folder for some widgets on your site and if you will include this files only in main files, not views/*</dd>

<dt>views/</dt>

<dd>This folder for your views for site if you use own server
If you create static site put your Pug or HTML there, and this files will be routed as `/`. For example
`views/index.pug -> /index.html`
`views/about.html -> /about.html`</dd>

</dl>

### Also, this framework provides configs for various tools, such as:

*   Bablel `.babelrc`
*   Eslint `.eslintrc`
*   htmllint `.htmllintrc`
*   js-beautify `.jsbeautifyrc`
*   postcss-sorting `.postcss-sorting.json`
*   pug-lint `.pug-lintrc`
*   Stylelint `.stylelintrc`

### How to use

First you need create file structure described previous, if you use Yeoman generator, skip this step

<pre>cp -Rp example/ src/</pre>

Create sample config, if you use Yeoman generator, skip this step

<pre>cp config.example.json config.json
vim config.json</pre>

Now you can execute `gulp`  for start build, watching and live-reload code. Or you can run `gulp build` or `gulp server` separately. Also you can run `gulp lint` for linting, `gulp fix` for fixing and beautifing code and`gulp self-update` for update this script.`--all` flag enable build of all files, no one changed.`--production` flag enable production mode.`--deploy` flag enable deploy uing rsync.
