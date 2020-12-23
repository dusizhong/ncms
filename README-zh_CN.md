# NCMS
[English](https://github.com/dusizhong/ncms#readme)  [中文版](https://github.com/dusizhong/ncms/blob/chinese/README-zh_CN.md)

一款基于Nodejs用于构建响应式网站CMS系统.

### 特色
- 干净简洁、易于使用
- 代码清晰、易于扩展
- 独立运行、易于部署
- 支持自定义模板

### 快速入手
```
cd ncms
npm install
npm start
```

### 配置
打开项目config -> conf.js文件, 修改一下配置:
```
title = 'NCMS'; // 站点名称
info = '一款基于Nodejs用于构建响应式网站CMS系统.'; // 站点简介
theme = 'default'; // 默认模板
secret = 'd4e3aafd1bfe9c0b0d3'; // session密钥
host = 'http://192.168.33.112'; // 域名/IP
port = 3000; // 端口
```

## 简介
NCMS是一款基于Nodejs开发的、用于构建响应式网站的CMS系统。它使用KOA处理异步操作，实现了更佳清晰简洁、易读的代码逻辑，具有极佳扩展性。
NCMS使用bootstrap4+ejs开发了前端模板和后端管理系统。借助Bootstrap4强大的栅格系统，使得您使用NCMS构建的网站，可在电脑、平板和手机端完美展现。
NCMS内置sqlite3数据库，无须任何的配置便可快速部署使用。数据接口层使用了强大的Sequelize ORM框架开发，如果需要，你仅需要简单修改db.js，便可快速切换成Mysql等外部数据库。
NCMS已具备类目（菜单）、标签、文章、单页、资源五项基本功能模块，如果你是一名开发者，你可以进行二次开发，实现更多功能。

> Programming is the art of telling another human what one wants the computer to do.</br>
> Donald Knuth

Hope you like it:)


### 模板说明
#### 设置模板
```
- 1、将新模板放置项目view文件夹，模板相关资源文件放置在public的assets文件夹中。
- 2、在config -> conf.js文件中，设置你的模板。（模板目录名称）
- 3、重启系统，完成。
```
#### 模板设计
在制作新模板，你至少需要了解ejs模板引擎的基本使用方法，如下所示: 

- 变量
```
<%= foo.bar %>
```
- 引用
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

## 参考
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


## 许可
MIT

版权所有 © Dusizhong.com

