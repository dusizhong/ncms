/*!
 * tag model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('tag', {
  id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
  name: db.STRING(10),
  memo: db.STRING(50),
  hits: db.INTEGER,
  enabled: db.BOOLEAN,
  updatedAt: db.STRING(19),
  createdAt: db.STRING(19)
}, {
  timestamps: false
})