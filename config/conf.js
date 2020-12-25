/*!
 * 全局配置
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */
 
'use strict';

const path = require('path');


/* 自定义配置 */
const title = 'NCMS'; //网站名称
const info = 'NCMS是一款基于Nodejs开发的、用于构建响应式网站的CMS系统。它使用KOA处理异步操作，实现了更佳清晰简洁、易读的代码逻辑，具有极佳扩展性。'; //网站简介
const theme = 'default'; //当前模板/主题
const secret = 'd4e3aafd1bfe9c0b0d3'; //session密钥
const host = 'http://192.168.33.112'; //域名/IP
const port = 3000; //默认端口
/* 自定义配置结束 */


module.exports = {
  TITLE: title,
  INFO: info,
  THEME: theme,
  SECRET: secret,
  HOST: host,
  PORT: port,
  RES_PATH: path.join(__dirname, '../public/resources/'),
  RES_SERVER: `${host}:${port}/resources/`,
}
