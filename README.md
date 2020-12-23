# NCMS
[English](https://github.com/dusizhong/ncms#readme)  [中文版](https://github.com/dusizhong/ncms/blob/chinese/README-zh_CN.md)

a clean Nodejs CMS for building responsive mobile-first sites.

### Features
- clean and clear, easy to use
- readable, reusable and refactorable
- standalone, all code, db and resource in one floder
- themes supported

### Quick start
```
cd ncms
npm install
npm start
```

### Setup
open config -> conf.js file, do below setup:
```
title = 'NCMS'; //your website title
info = 'NCMS is a clean & clear Nodejs CMS for building responsive mobile-first sites.'; //your website info
theme = 'default'; //default theme
secret = 'd4e3aafd1bfe9c0b0d3'; //your secret key
host = 'http://192.168.33.112'; //your host address
port = 3000; //default port
```

## Documentation
NCMS is clean content management system powered by Nodejs. It use koa for async handling that aim to provide clean self-documenting code for Humans.
NCMS use bootstrap4 and ejs to design the default template and admin UI, that allow you to build a responsive mobile-first sites running on PC, Tablet, Mobile perfectly.
NCMS use embedded database sqlite and sequelize ORM framework to handle data, it can easy to change to an external database mysql etc if you needed.
MCMS has category, tag, article, single-page, resources basic modules. If you are developer, you can do a deep develop to make your own NCMS.

> Programming is the art of telling another human what one wants the computer to do.</br>
> Donald Knuth

Hope you like it:)


### theme instruction
#### theme setup
```
- put your theme into view floder and put assets in public floder
- specify your theme in config -> conf.js
- restart NCMS
```
#### theme design
before you design new theme, things You ought to know first: 

how to use ejs templating engine:

- variables
```
<%= foo.bar %>
```
- layout
```
<%- include('header.html'); -%>
<h1>Title</h1>
<p>My page</p>
<%- include('footer.html'); -%>
```
- if
```
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```
- for
```
<ul>
  <% for(let i=0; i< list.length; i++) { %>
  <li><%= list[i].title %></li>
  <% } %>
</ul>
```

## Reference
- Nodejs:
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
See [Koa Reference](https://nodejs.org/en/).

- Koa:
Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within its core, and it provides an elegant suite of methods that make writing servers fast and enjoyable.
See [Koa Reference](https://koajs.com/).

- Sequelize:
An easy-to-use multi SQL dialect ORM for Node.js.
See [Sequelize Reference](https://sequelize.org/).

- Sqlite:
SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
[Sqlite Reference](https://www.sqlite.org/).

- Ejs:
Embedded JavaScript templating.
See [Ejs Reference](https://ejs.co/).

- Bootstrap:
The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.
See [Bootstrap Reference](https://getbootstrap.com/).

- JQuery:
JQuery JavaScript Library.
See [JQuery Reference](https://jquery.com/).

- TinyMCE:
The world's #1 JavaScript library for rich text editing.
See [TinyMCE Reference](https://www.tiny.com/).


## License
MIT

Copyright © 2020 Dusizhong.com

