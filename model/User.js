/*!
 * user model
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */

'use strict';

const db = require('../db/db.js');

module.exports = db.sequelize.define('user', {
    
	id: { type: db.INTEGER, autoIncrement: true, primaryKey: true },
    username: db.STRING(40),
    password: db.STRING(100),
    avatar: db.STRING(255),
    nickname: db.STRING(20),
    enabled: db.BOOLEAN,
    updatedAt: db.STRING(19),
    createdAt: db.STRING(19)
}, {
  timestamps: false
})