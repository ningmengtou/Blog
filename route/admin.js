const express = require('express');

// 创建admin路由对象
const admin = express.Router();

//渲染用户登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 渲染用户列表页面
admin.get('/user', require('./admin/usePage'));

// 实现退出功能
admin.get('/loginout', require('./admin/loginout'));

// 渲染用户页面
admin.get('/user-edit', require('./admin/user-edit'));

// 实现用户新增功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 创建用户修改功能
admin.post('/user-modify', require('./admin/user-modify'));

// 创建删除用户信息路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面
admin.get('/article', require('./admin/article'));

// 文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

// 文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));

// 文章修改功能
admin.post('/article-modify', require('./admin/article-modify'));

// 导出admin路由对象
module.exports = admin;