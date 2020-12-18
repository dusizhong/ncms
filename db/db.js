/*!
 * db connector
 * Copyright(c) 2021 dusizhong.com
 * MIT Licensed
 */

'use strict';

const { Sequelize, DataTypes, Op } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/ncmsdb.db'
});

sequelize.authenticate().then(() => {
  console.log('db connection has been established successfully!');
}).catch(err => {
  console.error('unable to connect to the database: ', err);
});

module.exports = {
  sequelize: sequelize,
  INTEGER: DataTypes.INTEGER,
  STRING: DataTypes.STRING,
  TEXT: DataTypes.TEXT,
  DOUBLE: DataTypes.DOUBLE,
  BOOLEAN: DataTypes.BOOLEAN,
  DATE: DataTypes.DATE,
  UUID: DataTypes.UUID,
  Op: Op
}
