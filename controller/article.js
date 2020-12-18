/*!
 * article controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const moment = require('moment');
const APIError = require('../middleware/error').APIError;
const db = require('../db/db.js');
const Category = require('../model/Category');
const Tag = require('../model/Tag');
const Article = require('../model/Article');
const Resource = require('../model/Resource');


module.exports = {
  
  list: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    let conditions = {};
    if(ctx.query.keyword) conditions.title = { [db.Op.like]: '%' + ctx.query.keyword + '%' };
    if(ctx.query.category) conditions.category = ctx.query.category;
    let attributes = { exclude: [ 'content' ] };
    let order = ['id', 'DESC'];
    if(ctx.query.order) order = ctx.query.order.split(',');
    let page = ctx.query.page || 1;
    let size = ctx.query.size || 10;
    let total = await Article.count({ where: conditions });
    let pages = Math.ceil(total / size);
    let first = page == 1;
    let last = page == pages;
    let records = await Article.findAll({ where: conditions, attributes: attributes, order: [ order ], limit: size, offset: (page-1) * size, raw: true });
    let data = { page: page, size: size, total: total, pages: pages, first: first, last: last, records: records };
    let categories = await Category.findAll({ where: { enabled: 1 }, order: [ ['sortId', 'ASC'] ], raw: true });
    await ctx.render('admin/article', { categories: categories, data: data });
  },

  editor: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    if(ctx.method == 'GET') {
      let categories = await Category.findAll({ where: { enabled: 1 }, order: [ ['sortId', 'ASC'] ], raw: true });
      let tags = await Tag.findAll({ order: [ ['id', 'DESC'] ], raw: true });
      let article = {};
      if(ctx.query.id) {
        let rex = /^\+?[1-9][0-9]*$/;
        if(!rex.test(ctx.query.id)) throw new APIError('invalid id');
        article = await Article.findOne({ where: { id: ctx.query.id } }); 
      }
      await ctx.render('admin/article-editor', { categories: categories, tags: tags, article: article });
      return;
    }
    let params = ctx.request.body;
    if(!params.title) throw new APIError('title is required');
    let exist = await Article.findOne({ where: { title: params.title } });
    if(params.id) {
      let article = await Article.findOne({ where: { id: params.id } });
      if(!article) throw new APIError('invalid id');
      if(exist && exist.title != params.title) throw new APIError('title already exists');
      article.category = params.category;
      article.title = params.title;
      article.pic = params.pic;
      article.tag = params.tag;
      article.author = params.author;
      article.intro = params.intro;
      article.content = params.content;
      article.recommends = params.recommends;
      article.enabled = params.enabled || 0;
      article.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await article.save();
    } else {
      if(exist) throw new APIError('title already exists');
      let article = {};
      article.category = params.category;
      article.title = params.title;
      article.pic = params.pic;
      article.tag = params.tag;
      article.author = params.author;
      article.intro = params.intro;
      article.content = params.content;
      article.recommends = params.recommends;
      article.hits = 0;
      article.enabled = params.enabled || 0;
      article.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      article.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await Article.create(article);
    }
    await ctx.redirect('/admin/article');
  },

  del: async (ctx, next) => {
    if(!ctx.session.user) throw new APIError('bad credentials');
    let params = ctx.request.body;
    if(!params.id) throw new APIError('id is required');
    let rex = /^\+?[1-9][0-9]*$/; //0-9
    if(!rex.test(params.id)) throw new APIError('invalid id');
    let article = await Article.findOne({ where: { id: params.id } });
    if(!article) throw new APIError('invalid id');
    await Article.destroy({ where: { id: params.id } });
    ctx.body = 'success';
  }

}
