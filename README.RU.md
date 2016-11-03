# Fast Start 

Шаблон для проекта для быстрого старта, он используется только для компиляции исходников,
и никаким образом не влияет на получаемый результат.

# Возможности

* Запуск сервера Nodejs при помощи Nodemon
* Живая перезагрузка файлов при помощи Browsersync
* Поддерживается создание статичных страниц
* Деплой при помощи rsync
* Компиляция Pug или HTML шаблонов (при помощи gulp-include)
* Компиляция JavaScript при помощи Browserify или импортирование кода при помощи gulp-include
* Компиляция JavaScript при помощи Babel
* Компиляция CSS при помощи PostCSS с плагинами precss и cssnext
* Продакшен билды минифицируются при помощи Uglify для JavaScript, cssnano для CSS, imagemin для изображений
* Для CSS и JavaScript поддерживаются карты кода (Sourcemaps)
* Код проверяется на ошибки (linting) при помощи Eslint для JavaScript, Stylelint для CSS, pug-lint для pug, htmllint для HTML
* Так-же возможно автоматическое исправление ошибок JavaScript при помощи Eslint и js-beautify; и CSS при помощи stylefmt и postcss-sorting

# Структура проекта

## Файлы

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

## Описание

### index.js, config.json, lib/ routes/

Файлы серверной части приложения, если проект не содержит серверной части, тогда эти файлы не нужны

### package.json, bower.json, robots.txt

Конфигурации для npm, bower и поисковых систем

### views/

Здесь содержатся Pug или HTML файлы. 
Для избежания повторений можно создать шаблон страницы в папке `templates/`, 
и при помощи extend использовать его для страниц в `views/`, либо, 
если вы не хотите использовать Pug, 
эту папку (templates/) можно использовать для шаблонов ваших страниц, 
которые можно подключать при помощи `<!--=include templates/file.html -->`.
Папку `partials/` можно использовать для каких-то виджетов на вашем сайте, 
например, виджета Google Maps, плеера, и т.д. Если ваш сайт статичный
файлы из этой папки будут кмпилироватся в `dist/`, если нет они будут копироватся без изменений 
в `./dist/views/`.

### public/js/

Здесь находятся скрипты. Если используется Browserify, 
тогда можно подключать скрипты из `includes/` и `partials/` при помощи
`require`, а если Browserify отключен, можно использовать `//=include includes/file.js`, 
однако этот метод просто подставляет содержимое файла то мест, откуда была вызвана эта директива.
Папка `views/` используется для скриптов для каких-то определенных страниц, 
например `views/about.js` для `http://site/about`

### public/css/

Структура подобна `public/js/`, но здесь находятся стили которые компилируются при помощи PostCSS.

### public/fonts, public/img

Эти файлы копируются в папку собраного сайта, но изображения дополнительно минифицируются

# Конфигурация

В файле `config.json`
```json
{
  "server": false,
  "browserify": false,
  "deploy": {
    "hostname": "localhost",
    "username": "grisa",
    "destination": "./test",
  }
}
```
параметр `server` определяет является ли сайт статичным, или содержит серверную часть.
Если он задан, тогда он попытается запустить файл `./dist/index.js` при помощи
Nodemon с параметром NODE_ENV=dev, и запустит Browsersync, 
который будет проксировать в 10000 порта на 8000 . 
Но если этот параметр не задан, Browsersync запустит статический сервер на 8000 порту

Параметр `browserify` отвечает за использование Browserify

Параметр `deploy` отвечает за параметры сервера для разворачивания приложения,
Эти параметры напрямую будут переданны rsync.

# Использование

При запуске `gulp` последовательно запустится сборка, локальный сервер и 
слежение за изменениями файлов. Так-же их можно запустить по отдельности: 
`gulp build`, `gulp server` и `gulp watch`.
Так-же можно использовать `gulp lint` для линтинга, 
`gulp fix` для исправления ошибок и форматирования кода и 
`gulp deploy` для развёртывания приложения.

По уможчанию компилируются только изменённые файлы, но если задать параметр `--all`
будут пересобиратся все файлы.
Для сборки готового приложения можно использовать параметр `--production`, 
в этом случае gulp будет собирать минифицирование версии файлов, без Sourcemap
и не будет запускать локальный сервер.

### Результат в папке dist/
```
dist/
├── bower.json
├── package.json
├── index.html
├── public
│   ├── css
│   │   ├── main.css
│   │   └── views
│   │       └── index.css
│   └── js
│       ├── main.js
│       └── views
│           └── index.js
└── robots.txt
```
или для серверного приложения
```
dist/
├── bower.json
├── package.json
├── config.json
├── index.js
├── public
│   ├── css
│   │   ├── main.css
│   │   └── views
│   │       └── index.css
│   └── js
│       ├── main.js
│       └── views
│           └── index.js
├── views
│   ├── partials
│   │   └── googleMaps.pug
│   ├── templates
│   │   └── default.pug
│   ├── index.pug
│   └── about.pug
└── robots.txt
```

# TODO

- [ ] Линтинг JSON файлов
- [ ] Поддержка SQL
- [ ] Доработать примеры
- [ ] Рефракторинг сборки JavaScript при помощи Browserify
- [ ] Поддержка Webpack?

## License

MIT © [Grigorii Horos](https://github.com/horosgrisa)
