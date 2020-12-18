/*!
 * category controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const moment = require('moment');
const APIError = require('../middleware/error').APIError;
const db = require('../db/db.js');
const Category = require('../model/Category');


module.exports = {

  list: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    let categories = await Category.findAll({ where: ctx.query, order: [ ['sortId', 'ASC'] ], raw: true });
    await ctx.render('admin/category', { categories: categories });
  },

  create: async (ctx, next) => {
    if(!ctx.session.user) throw new APIError('bad credentials');
    let params = ctx.request.body;
    if(!params.name) throw new APIError('name is required');
    let exist = await Category.findOne({ where: { name: params.name } });
    if(params.id) {
      let category = await Category.findOne({ where: { id: params.id } });
      if(!category) throw new APIError('invalid id');
      if(exist && exist.name != params.name) throw new APIError('name already exists');
      category.sortId = params.sortId || 0;
      category.name = params.name;
      category.alias = params.alias;
      category.url = params.url;
      category.enabled = params.enabled || 0;
      category.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await category.save();
    } else {
      if(exist) throw new APIError('name already exists');
      let category = {};
      category.sortId = params.sortId || 0;
      category.name = params.name;
      category.alias = params.alias;
      category.url = params.url;
      category.enabled = params.enabled || 0;
      category.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
      category.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      await Category.create(category);
    }
    await ctx.redirect('/admin/category');
  },

  del: async (ctx, next) => {
    if(!ctx.session.user) throw new APIError('bad credentials');
    let params = ctx.request.body;
    if(!params.id) throw new APIError('id is required');
    let rex = /^\+?[1-9][0-9]*$/; //0-9
    if(!rex.test(params.id)) throw new APIError('invalid id');
    let category = await Category.findOne({ where: { id: params.id } });
    if(!category) throw new APIError('invalid id');
    await Category.destroy({ where: { id: params.id } });
    ctx.body = 'sucess';
  }
}