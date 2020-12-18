/*!
 * page controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const conf = require('../config/conf');
const APIError = require('../middleware/error').APIError;
const db = require('../db/db.js');
const Page = require('../model/Page');


module.exports = {
  
  list: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    let conditions = {};
    if(ctx.query.keyword) conditions.title = { [db.Op.like]: '%' + ctx.query.keyword + '%' };
    let attributes = { exclude: [ 'content' ] };
    let order = ['id', 'DESC'];
    if(ctx.query.order) order = ctx.query.order.split(',');
    let page = ctx.query.page || 1;
    let size = ctx.query.size || 20;
    let total = await Page.count({ where: conditions });
    let pages = Math.ceil(total / size);
    let first = page == 1;
    let last = page == pages;
    let records = await Page.findAll({ where: conditions, attributes: attributes, order: [ order ], limit: size, offset: (page-1) * size, raw: true });
    let data = { page: page, size: size, total: total, pages: pages, first: first, last: last, records: records };
    await ctx.render('admin/page', { data: data });
  },

  editor: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    if(ctx.method == 'GET') {
      let page = {};
      if(ctx.query.id) {
        let rex = /^\+?[1-9][0-9]*$/;
        if(!rex.test(ctx.query.id)) throw new APIError('invalid id');
        page = await Page.findOne({ where: { id: ctx.query.id } }); 
      }
      await ctx.render('admin/page-editor', { page: page });
      return;
    }
    let params = ctx.request.body;
    if(!params.title) throw new APIError('title is required');
    let exist = await Page.findOne({ where: { title: params.title } });
    if(params.id) {
      let page = await Page.findOne({ where: { id: params.id } });
      if(!page) throw new APIError('invalid id');
      if(exist && exist.title != params.title) throw new APIError('title already exists');
      page.title = params.title;
      page.content = params.content;
      page.enabled = params.enabled || 0;
      page.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await page.save();
    } else {
      if(exist) throw new APIError('title already exists');
      let page = {};
      page.title = params.title;
      page.content = params.content;
      page.hits = 0;
      page.enabled = params.enabled || 0;
      page.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      page.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await Page.create(page);
    }
    await ctx.redirect('/admin/page');
  },

  del: async (ctx, next) => {
    if(!ctx.session.user) throw new APIError('bad credentials');
    let params = ctx.request.body;
    if(!params.id) throw new APIError('id is required');
    let rex = /^\+?[1-9][0-9]*$/; //0-9
    if(!rex.test(params.id)) throw new APIError('invalid id');
    let page = await Page.findOne({ where: { id: params.id } });
    if(!page) throw new APIError('invalid id');
    await Page.destroy({ where: { id: params.id } });
    ctx.body = 'success';
  }

}



