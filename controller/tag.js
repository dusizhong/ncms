/*!
 * tag controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const moment = require('moment');
const conf = require('../config/conf');
const APIError = require('../middleware/error').APIError;
const db = require('../db/db.js');
const Tag = require('../model/Tag');

module.exports = {

    list: async (ctx, next) => {
        if(!ctx.session.user) {
            await ctx.redirect('/login');
            return;
        }
        let tags = await Tag.findAll({ order: [ ['id', 'DESC'] ], raw: true });
        await ctx.render('admin/tag', { tags: tags });
    },

    create: async (ctx, next) => {
        if(!ctx.session.user) throw new APIError('bad credentials');
        let params = ctx.request.body;
        if(!params.name) throw new APIError('name is required');
        let exist = await Tag.findOne({ where: { name: params.name } });
        if(params.id) {
            let tag = await Tag.findOne({ where: { id: params.id } });
            if(!tag) throw new APIError('invalid id');
            if(exist && exist.name != params.name) throw new APIError('name already exists');
            tag.name = params.name;
            tag.memo = params.memo;
            tag.enabled = params.enabled || 0;
            tag.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            await tag.save();
        } else {
            if(exist) throw new APIError('name already exists');
            let tag = {};
            tag.name = params.name;
            tag.memo = params.memo;
            tag.hits = 0;
            tag.enabled = params.enabled || 0;
            tag.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            tag.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
            await Tag.create(tag);
        }
        await ctx.redirect('/admin/tag');
    },

    del: async (ctx, next) => {
        if(!ctx.session.user) throw new APIError('bad credentials');
        let params = ctx.request.body;
        if(!params.id) throw new APIError('id is required');
        let rex = /^\+?[1-9][0-9]*$/;
        if(!rex.test(params.id)) throw new APIError('invalid id');
        let tag = await Tag.findOne({ where: { id: params.id } });
        if(!tag) throw new APIError('invalid id');
        await Tag.destroy({ where: { id: params.id } });
        ctx.body = 'sucess';
    }
}



