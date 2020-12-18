/*!
 * resource model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');


module.exports = db.sequelize.define('resource', {
  id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
  name: db.STRING(100),
  type: db.STRING(20),
  size: db.INTEGER,
  url: db.STRING(255),
  updatedAt: db.STRING(19),
  createdAt: db.STRING(19)
}, {
  timestamps: false
})