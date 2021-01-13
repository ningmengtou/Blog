const { Article } = require('../../model/article');
// 引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递过来的页码
    const { page } = req.query;

    // 添加一个标识  当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据  find().populate('author')可以关联数据
    // page: 查询当前页的数据
    // size：每页显示的数据条数
    // display：客户端要显示的页码数量
    // exec：向数据库发送查询请求  返回值是一个对象
    let articles = await pagination(Article).find().page(page).size(2).display(3).exec();

    // res.send(articles)

    res.render('admin/article.art', {
        articles: articles
    });
};