const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 接收post 和 get请求参数
    const { id } = req.query;
    const { title, author, publishDate, content } = req.body;

    console.log(req.body);

    // await Article.updateOne({ _id: id }, {
    //     title: title,
    //     author: author,
    //     publishDate: publishDate,
    //     content: content
    // });

    res.redirect('/admin/article');


    // res.render('admin/article-edit');
};