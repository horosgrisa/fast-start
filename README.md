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

<pre>src
├── package.json
├── bower.json
├── index.js
├── lib/
├── routes/
├── public/
│   ├── js/
│   │   ├── includes/
│   │   ├── partials/
│   │   └── views/
│   ├── css/
│   │   ├── includes/
│   │   ├── partials/
│   │   └── views/
│   ├── font/
│   └── img/
└── views/
   ├── partials/
   └── templates/</pre>

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

This folder for your views for site if you use own server
If you create static site put your Pug or HTML there, and this files will be routed as `/`. For example
`views/index.pug -> /index.html`
`views/about.html -> /about.html`</dl>
