const express = require('express');
// 创建home路由对象
const home = express.Router();

// 博客前台首页展示页面
home.get('/', require('./home/index'));

// 博客前台文章详情展示页面
home.get('/article', require('./home/article'));

// 博客文章评论功能路由
home.post('/comment', require('./home/comment'));

// 导出home路由对象
module.exports = home;