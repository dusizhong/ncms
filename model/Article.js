/*!
 * article model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('article', {

	id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
    category: db.STRING(10),
    title: db.STRING(100),
    pic: db.STRING(100),
    tag: db.STRING(255),
    intro: db.STRING(255),
    author: db.STRING(20),
    content: db.STRING,
    recommends: db.INTEGER,
    hits: db.INTEGER,
    enabled: db.INTEGER,
    updatedAt: db.STRING(19),
    createdAt: db.STRING(19)
}, {
  timestamps: false
})