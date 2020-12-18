/*!
 * user controller
 * Copyright(c) 2020 Dusizhong.com
 * MIT Licensed
 */
 
'use strict';

const bcrypt = require('bcryptjs');
const moment = require('moment');
const APIError = require('../middleware/error').APIError;
const User = require('../model/User');


module.exports = {

    login: async (ctx, next) => {
        if(ctx.method == 'GET') {
            await ctx.render('admin/login');
            return;
        }
        let params = ctx.request.body;
        if(!params.username) throw new APIError('username is required');
        if(!params.password) throw new APIError('password is required');
        let user = await User.findOne({ where: { username: params.username } });
        if(!user) throw new APIError('invalid username');
        if(!bcrypt.compareSync(params.password, user.password)) throw new APIError('invalid password');
        if(user.enabled == 0) throw new APIError('user not enabled');
        ctx.session.user = { avatar: user.avatar, username: user.username };
        ctx.redirect('/admin/dashboard');
    },

    modifyPassword: async (ctx, next) => {
        if(!ctx.session.user) throw new APIError('bad credentials');
        let params = ctx.request.body;
        if(!params.oldPassword) throw new APIError('old username is required');
        if(!params.newPassword) throw new APIError('new password is required');
        let user = await User.findOne({ where: { username: ctx.session.user.username } });
        if(!user) throw new APIError('unexcepted error');
        if(!bcrypt.compareSync(params.oldPassword, user.password)) throw new APIError('invalid old password');
        user.password = bcrypt.hashSync(params.newPassword, bcrypt.genSaltSync());
        user.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        await user.save(user);
        ctx.body = 'success';
    },

    logout: async (ctx, next) => {
        ctx.session = null;
        ctx.redirect('/login')
    }

}



