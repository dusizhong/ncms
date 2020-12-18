/*!
 * global config
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */
 
'use strict';

const path = require('path');


/* custom config */

const title = 'NCMS'; //your website title
const info = 'NCMS is a clean & clear Nodejs CMS for building responsive mobile-first sites.'; //your website info
const theme = 'default'; //default theme
const secret = 'd4e3aafd1bfe9c0b0d3'; //your secret key
const host = 'http://192.168.33.112'; //your host address
const port = 3000; //default port

/* custom config end */


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
