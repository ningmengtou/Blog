const { Article } = require('../../model/article');
const path = require('path')

module.exports = async(req, res) => {
    // 添加一个标识  当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 接收get请求参数id
    const { id } = req.query;
    // 拼接一个路径字符串
    const pathAddress = path.join(__dirname, '../', 'public');

    // 根据是否有id来判断是修改文章还是添加文章
    if (id) {
        // 根据id查找数据文档  文章修改页面的路径是/admin/modify
        let article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            article: article,
            pathAddress: pathAddress,
            linkdd: '/admin/article-modify?id=' + id,
        });
    } else {
        // 新增文章页面的路径是/admin/add
        res.render('admin/article-edit', {
            article: article,
            linkdd: '/admin/article-add',
        });
    };

    // res.render('admin/article-edit');

}