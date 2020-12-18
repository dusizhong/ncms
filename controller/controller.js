/*!
 * controllers importer
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */
 
'use strict';

const fs = require('fs');


let files = fs.readdirSync(__dirname);

// filter the .js file
let js_files = files.filter((f) => {
  if(f !== 'controller.js') {
    return f.endsWith('.js');
  }
}, files);

// import js file
for (let f of js_files) {
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require('../controller/' + f);
  console.log(`import controller ${name} from file ${f} ...`);
}
