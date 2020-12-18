/*!
 * global error handler
 * Copyright(c) 2021 Dusizhong.com
 * MIT Licensed
 */

'use strict';


module.exports = {

  APIError: function (message) {
    this.message = message || 'unexcepted error';
  },

  handler: function (pathPrefix) {
    pathPrefix = pathPrefix || '/';
    return async (ctx, next) => {
      if(ctx.req.url == '/favicon.ico') return;
      if(ctx.request.path.startsWith(pathPrefix)) {
        try {
          await next();
        } catch (e) {
          ctx.response.status = 200;
          ctx.response.body = e.message || '';
        }
      } else {
        await next();
      }
    }
  }
  
}