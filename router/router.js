/*!
 * global router
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */
 
'use strict';

const router = require('koa-router')();
const controller = require('../controller/controller');


router
	.get('/login', controller.user.login)
	.post('/login', controller.user.login)
	.get('/logout', controller.user.logout)

  .get('/admin/dashboard', controller.dashboard.home)
  .post('/admin/dashboard/modifypassword', controller.user.modifyPassword)
  .get('/admin/dashboard/statistic', controller.dashboard.statistic)

  .get('/admin/category', controller.category.list)
  .post('/admin/category/create', controller.category.create)
  .post('/admin/category/del', controller.category.del)

  .get('/admin/tag', controller.tag.list)
  .post('/admin/tag/create', controller.tag.create)
  .post('/admin/tag/del', controller.tag.del)

  .get('/admin/article', controller.article.list)
  .get('/admin/article/editor', controller.article.editor)
  .post('/admin/article/editor', controller.article.editor)
  .post('/admin/article/editor/upload', controller.resource.upload)
  .post('/admin/article/del', controller.article.del)

  .get('/admin/page', controller.page.list)
  .get('/admin/page/editor', controller.page.editor)
  .post('/admin/page/editor', controller.page.editor)
  .post('/admin/page/editor/upload', controller.resource.upload)
  .post('/admin/page/del', controller.page.del)

  .get('/admin/resource', controller.resource.list)
  .post('/admin/resource/upload', controller.resource.upload)
  .post('/admin/resource/del', controller.resource.del)

  .get('/', controller.index.index)
  .get('/page/:id', controller.index.page)
  .get('/:category', controller.index.list)
  .get('/:category/:id', controller.index.detail)

module.exports = router