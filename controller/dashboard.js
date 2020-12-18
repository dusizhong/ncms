/*!
 * dashboard controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const moment = require('moment');
const conf = require('../config/conf');
const db = require('../db/db.js');
const Vlog = require('../model/Vlog');


module.exports = {

  home: async (ctx, next) => {
    if(!ctx.session.user) {
      await ctx.redirect('/login');
      return;
    }
    let page = ctx.query.page || 1;
    let size = ctx.query.size || 10;
    let total = await Vlog.count();
    let pages = Math.ceil(total / size);
    let first = page == 1;
    let last = page == pages;
    let data = await Vlog.findAll({ order:[ ['id', 'DESC'] ], limit: size, offset: (page-1) * size, raw: true });
    let records = { page: page, size: size, total: total, pages: pages, first: first, last: last, data: data };
    await ctx.render('admin/dashboard', { records: records });
  },

  statistic: async (ctx, next) => {
    if(!ctx.session.user) throw new APIError('bad credentials');
    let vlogs = await Vlog.findAll({ where: { 'createdAt': {[db.Op.like]: moment().format('YYYY') + '%'} },  raw: true });
    let chartLabels = [];
    let chartDatas = [];
    for(let v of vlogs) {
      let label = v.createdAt.substring(0, 7);
      let position = chartLabels.indexOf(label);
      if(position < 0) {
        chartLabels.push(label);
        chartDatas.push(1);
      } else {
        chartDatas[position] = Number(chartDatas[position]) + 1;
      }
    }
    ctx.body = { chartLabels: chartLabels, chartDatas: chartDatas };
  }
}