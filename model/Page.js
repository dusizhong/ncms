/*!
 * page model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('page', {

	id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
    title: db.STRING(100),
    content: db.STRING,
    hits: db.INTEGER,
    enabled: db.INTEGER,
    updatedAt: db.STRING(19),
    createdAt: db.STRING(19)
}, {
  timestamps: false
})