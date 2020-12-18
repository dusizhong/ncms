/*!
 * category model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('category', {

	id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
    sortId: db.INTEGER,
    name: { type: db.STRING(10), allowNull: false, unique: true },
    alias: db.STRING(10),
    url: db.STRING(100),
    enabled: db.BOOLEAN,
    updatedAt: db.STRING(19),
    createdAt: db.STRING(19)
}, {
  timestamps: false
})