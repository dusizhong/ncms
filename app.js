/*!
 * app.js
 * ncms server starter
 * Copyright(c) 2020 dusizhong.com
 * MIT Licensed
 */

'use strict';

const Koa = require('koa');
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const conf = require('./config/conf');
const router = require('./router/router');
const error = require('./middleware/error');


const app = new Koa();
app.keys = [conf.SECRET];
app.use(koaSession({ key: 'ncms.session' }, app));
app.use(koaBody({ multipart: true }));
app.use(koaStatic(__dirname + '/public'));
app.use(koaViews(path.join(__dirname, '/view'), { map: {html: 'ejs'} }));
// app.use(koaNunjucks({ ext: 'html', path: path.join(__dirname, '/view'), nunjucksConfig: { watch: true } }));
app.use(error.handler());
app.use(router.routes());
app.listen(conf.PORT);
setTimeout(() => { console.log(`NCMS server start at port ${conf.PORT}...`); }, 1000);
