# Fast Start 

Шаблон для проекта для быстрого старта, он используется только для компиляции исходников.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Оглавление** 

- [Возможности](#%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8)
- [Структура проекта](#%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0)
- [Компиляция](#%D0%BA%D0%BE%D0%BC%D0%BF%D0%B8%D0%BB%D1%8F%D1%86%D0%B8%D1%8F)
- [Компиляторы](#%D0%BA%D0%BE%D0%BC%D0%BF%D0%B8%D0%BB%D1%8F%D1%82%D0%BE%D1%80%D1%8B)
- [Конфигурация](#%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D1%8F)
- [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
- [Скомпилированные файлы](#%D1%81%D0%BA%D0%BE%D0%BC%D0%BF%D0%B8%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D1%8B)
- [TODO](#todo)
- [Лицензия](#%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Возможности

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

## Структура проекта

Вот так может выглядеть структура вашего проекта:

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

## Компиляция

1. Все файлы из `src/` за исключением `node_modules`, `bower_components/`, `assets/`, `views/` копируются с сохранением структуры в `dist/`
2. Файлы из `views/` копируются если параметр `"server": true` сохраняются либо в `dist/views/`, а если `"server": false` тогда компилируются только файлы `src/views/*.pug` и `scr/views/*html` 
3. `src/assets/fonts/` и `src/assets/img/` копируются в `dist/public/`
4. `src/assets/js/*.js` и `src/assets/js/views/**` компилируются в `dist/public/js` с сохранением структуры
5. `src/assets/css/*.css` и `src/assets/css/views/**` компилируются в `dist/public/css` с сохранением структуры

## Компиляторы

* JavaScript компилируется только из папок `src/assets/js/` и `src/assets/js/views/`, остальные файлы вы должны подключать сами в ваши скрипты 
* JavaScript может компилироватся при помощи Browserify, он позволяет подключать скрипты/модули при помощи `require`, например `const myModule = require('./includes/myModule')`
* Если Browserify отключен, можно использовать `gulp-include`, он вставляет содержимое подключаемых файлов туда, где он был вызван.
* JavaScript дополнительно компилируется babel, это позволяет использовать последние возможности ES-2015
* Код для продакена минифицируется при помоши uglify-js
* Для кода генерируются Sourcemaps, если он не предназначен для продакшена
* CSS компилируется только из папок `src/assets/css/` и `src/assets/css/views/`, остальные файлы вы должны подключать сами в ваши стили
* CSS компилируется при помощи PostCSS с плагином precss, это позволяет импортировать стили при помощи `@import 'includes/style'`, это импортирует файл `includes/_style.css`
* Стили для продакшена минифицируются
* Для стилей генерируются Sourcemaps, если они не предназначены для продакшена
* Изобрания для продакшена минифицируются при помощи `imagemin`
* Pug и HTML компилирируются минимизированым для продакшена и форматированым для разработки

## Конфигурация

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

## Использование

При запуске `gulp` последовательно запустится сборка, локальный сервер и 
слежение за изменениями файлов. Так-же их можно запустить по отдельности: 
`gulp build`, `gulp server` и `gulp watch`.
Так-же можно использовать `gulp lint` для линтинга, 
`gulp fix` для исправления ошибок и форматирования кода и 
`gulp deploy` для развёртывания приложения и `gulp self-update` для обновляния самого себя.

По уможчанию компилируются только изменённые файлы, но если задать параметр `--all`
будут пересобиратся все файлы.
Для сборки готового приложения можно использовать параметр `--production`, 
в этом случае gulp будет собирать минифицирование версии файлов, без Sourcemap
и не будет запускать локальный сервер.

## Скомпилированные файлы
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

## TODO

- [ ] Линтинг JSON файлов
- [ ] Поддержка LESS и SASS
- [ ] Поддержка Webpack?
- [ ] Поддержка SQL
- [ ] Доработать `examples`
- [ ] Рефракторинг сборки JavaScript при помощи Browserify?
- [x] Рефракторинг сборки Pug
- [x] Рефракторинг сборки HTML
- [x] Линтинг HTML htmlhint
- [ ] Минификация HTML
- [ ] Тестирование при помощи tape?
- [ ] **Сделать нормальный README**
- [ ] posthtml?

## Лицензия

MIT © [Grigorii Horos](https://github.com/horosgrisa)
