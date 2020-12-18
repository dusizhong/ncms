/*!
 * resource controller
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
const Resource = require('../model/Resource');


module.exports = {

    list: async (ctx, next) => {
        if(!ctx.session.user) {
            await ctx.redirect('/login');
            return;
        }
        let conditions = {};
        if(ctx.query.keyword) conditions.name = { [db.Op.like]: '%' + ctx.query.keyword + '%' };
        let page = ctx.query.page || 1;
        let size = ctx.query.size || 20;
        let total = await Resource.count({ where: conditions });
        let pages = Math.ceil(total / size);
        let first = page == 1;
        let last = page == pages;
        let records = await Resource.findAll({ where: conditions, order: [ ['id', 'DESC'] ], limit: size, offset: (page-1) * size, raw: true });
        let data = { page: page, size: size, total: total, pages: pages, first: first, last: last, records: records };
        await ctx.render('admin/resource', { data: data });
    },

    upload: async (ctx, next) => {
        if(!ctx.session.user) throw new APIError('bad credentials');
        let file = ctx.request.files.file;
        let reader = fs.createReadStream(file.path);
        let upStream = fs.createWriteStream(conf.RES_PATH + file.name);
        await reader.pipe(upStream);
        let resource = {};
        resource.name = file.name;
        resource.type = file.name.substring(file.name.lastIndexOf('.')+1);
        resource.size = file.size;
        resource.url = conf.RES_SERVER + file.name;
        resource.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        resource.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        await Resource.create(resource);
        ctx.body = { location : conf.RES_SERVER + file.name };
    },

    del: async (ctx, next) => {
        if(!ctx.session.user) throw new APIError('bad credentials');
        let params = ctx.request.body;
        if(!params.id) throw new APIError('id is required');
        let rex = /^\+?[1-9][0-9]*$/; //0-9
        if(!rex.test(params.id)) throw new APIError('invalid id');
        let resource = await Resource.findOne({ where: { id: params.id } });
        if(!resource) throw new APIError('invalid id');
        await Resource.destroy({ where: { id: params.id } });
        fs.unlinkSync(conf.RES_PATH + resource.name);
        ctx.body = 'sucess';
    }
}



