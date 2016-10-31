# Fast Start

This is a lightweight framework used to create and compile your site

## Features

* Nodejs run with nodemon
* Static server with browsersync
* Live code reload with nodemon and/or browsersync
* Deploy with rsync
* Pug or HTML templates
* Pug compilation
* HTML compilation (`gulp-include`) as fallback
* Browserify support
* JavaScript compilation with gulp-include as fallback
* Babel for JavaScript
* Uglify code for production
* Postcss support (precss and postcss-cssnext)
* CSS minimization with cssmin
* Sourcemaps support for JavaScript and CSS
* Image compressing with imagemin
* CSS lint with stylelint
* CSS fix with stylefmt and postcss-sorting
* JavaScript lint with eslint
* JavaScript fix with eslint and js-beautify
* HTML lint with htmllint
* HTML prettify with html-prettify
* Pug lint with pug-lint

## Project Structure

### File tree
```
src
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
   └── templates/
```

### Description

#### package.json

File with npm deps

#### bower.json

File with bower deps

#### index.js

Main file of your Nodejs project. This script will be called by nodemon when you run `gulp`.
If you're making a static site, you won't need this file.

#### lib/

Your JavaScript code for backend
If you're making a static site, you won't need this folder either.

#### routes/

This folder should be used for scripts which define the routes for you site

#### public/

This folder will be routed as '/public' with Browsersync, or, in case you use your own server, you must make this folder accesible as `/public`

#### public/{js,css}/

It'll be a good practice if you'll use those files as the main scripts/styles for your site

#### public/\*/views/

Also it would be very nice if you'll use this files for some of your routes, for example
```
views/index.css -> /
views/about.css -> /about
```

#### public/\*/includes/

It's recommended for you to use this files in order to include the main files
Example of JavaScript including
```js
const $ = require('jquery') // If you use Browserify
//=require includes/somefile.js // If you use fallback `gulp-include`
```

Example of CSS including:  
```css
@import 'includes/somefile';
/* This import in your css includes/_somefile.css */
```

#### public/*/partials

This folder is very similar to includes/, but it would be nice if you'll use this folder for some widgets of your site, and it's recommended to include this files only in the main files (and not in the views/* files)

#### views/

This is the folder for your views of the site, if you use your own server
If youre creating a static site - put your Pug or HTML there, and the files will be routed as `/`. For example
```
views/index.pug -> /index.html
views/about.html -> /about.html
```

### Also, this framework provides configs for a lot of various tools, such as:

* Bablel `.babelrc`
* Eslint `.eslintrc`
* htmllint `.htmllintrc`
* js-beautify `.jsbeautifyrc`
* postcss-sorting `.postcss-sorting.json`
* pug-lint `.pug-lintrc`
* Stylelint `.stylelintrc`

### How to use

First you need create the file structure described previous (if you use Yeoman generator, you can skip this step)  
```
cp -Rp example/ src/
```

Create a sample config (if you use Yeoman generator, skip this step)  
```
cp config.example.json config.json
vim config.json
```

Now you can execute `gulp` in order to start the build, watching and live-reload your code. Or you can simply run `gulp build` or `gulp server` separately. Also you can run `gulp lint` for linting, `gulp fix` for fixing and beautifing the code and `gulp self-update` for updating this script.`--all` flag enables the building of all the files, without changing none of them. `--production` flag enables the production mode.`--deploy` flag enables deploying using rsync.

## License

MIT © [Grigorii Horos](https://github.com/horosgrisa)
