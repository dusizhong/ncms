/*!
 * visit log model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('vlog', {
	
  id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
  ip: db.STRING(50),
  browser: db.STRING(255),
  language: db.STRING(50),
  url: db.STRING(255),
  createdAt: db.STRING(19)
}, {
  timestamps: false
})