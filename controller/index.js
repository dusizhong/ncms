/*!
 * index controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const moment = require('moment');
const conf = require('../config/conf');
const db = require('../db/db');
const Category = require('../model/Category');
const Tag = require('../model/Tag');
const Article = require('../model/Article');
const Page = require('../model/Page');
const Vlog = require('../model/Vlog');


async function getCategories() {
  return await Category.findAll({ where: { enabled: 1 }, order: [ ['sortId', 'ASC'] ], raw: true });
}

async function getHots(query) {
  query.order = 'hits,DESC';
  return await getArticles(query);
}

async function getTags() {
  return await Tag.findAll({ where: { enabled: 1 }, order: [['hits','DESC']], raw: true });
}

async function getArticles(query) {
  let conditions = { enabled: 1 };
  if(query.keyword) conditions.title = { [db.Op.like]: '%' + query.keyword + '%' };
  if(query.tag) conditions.tag = { [db.Op.like]: '%' + query.tag + '%' };
  if(query.category) conditions.category = query.category;
  let order = ['id', 'DESC'];
  if(query.order) order = query.order.split(',');
  let page = query.page || 1;
  let size = query.size || 10;
  let total = await Article.count({ where: conditions });
  let pages = Math.ceil(total / size);
  let first = page == 1;
  let last = page == pages;
  let records = await Article.findAll({ attributes: { exclude: [ 'content' ] }, where: conditions, order: [ order ], limit: size, offset: (page-1) * size, raw: true });
  return { page: page, size: size, total: total, pages: pages, first: first, last: last, records: records };
}

function createVlog(ctx) {
  let vlog = {};
  vlog.url = ctx.req.url;
  vlog.ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
  vlog.browser = ctx.request.header['user-agent'] || '';
  vlog.language = ctx.request.header['accept-language'] || '';
  vlog.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  Vlog.create(vlog);
}


module.exports = {

  index: async (ctx, next) => {
    let site = { name: conf.TITLE, title: conf.TITLE, info: conf.INFO };
    let categories = await getCategories();
    let banners = await Article.findAll({ attributes: { exclude: [ 'content' ] }, where: { recommends: 1 }, order: [ ['id', 'DESC'] ], limit: 3, raw: true });
    let ads = await Article.findAll({ attributes: { exclude: [ 'content' ] }, where: { recommends: 2 }, order: [ ['id', 'DESC'] ], limit: 2, raw: true });
    let hots = await getHots(ctx.query);
    let tags = await getTags();
    let data = await getArticles(ctx.query);
    console.log(ctx.query)
    await ctx.render(conf.THEME + '/index', { site: site, categories: categories, banners: banners, ads: ads, hots: hots, tags: tags, data: data });
    createVlog(ctx);
  },

  list: async (ctx, next) => {
    let categories = await getCategories();
    let category = { name: ctx.params.category };
    for(let c of categories) {
      if(category.name == c.name) category = c;
    }
    let title = category.alias? category.alias : category.name + ' · ' + conf.TITLE;
    let site = { name: conf.TITLE, title: title, info: conf.INFO };
    ctx.query.category = ctx.params.category;
    let hots = await getHots(ctx.query);
    let tags = await getTags();
    let data = await getArticles(ctx.query);
    await ctx.render(conf.THEME + '/list', { site: site, categories: categories, hots: hots, tags: tags, data: data });
    createVlog(ctx);
  },

  detail: async (ctx, next) => {
    let categories = await getCategories();
    let article = await Article.findOne({ where: ctx.params });
    await Article.update({ hits: db.sequelize.literal('hits + 1')}, { where: {id: ctx.params.id} } );
    let site = { name: conf.TITLE, title: article.title + ' · ' + conf.TITLE, info: conf.INFO };
    let query = { order: 'hits,DESC' };
    query.category = article.category;
    let hots = await getArticles(query);
    let tags = await getTags();
    await ctx.render(conf.THEME + '/detail', { site: site, categories: categories, hots: hots, tags: tags, article: article });
    createVlog(ctx);
  },

  page: async (ctx, next) => {
    let categories = await getCategories();
    let page = await Page.findOne({ where: ctx.params });
    let site = { name: conf.TITLE, title: page.title + ' · ' + conf.TITLE, info: conf.INFO };
    await Page.update({ hits: db.sequelize.literal('hits + 1')}, { where: {id: ctx.params.id} } );
    await ctx.render(conf.THEME + '/page', { site: site, categories: categories, page: page });
    createVlog(ctx);
  }

}