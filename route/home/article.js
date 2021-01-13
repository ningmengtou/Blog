const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {


    // 获取到传递过来的id参数
    const { id } = req.query;
    // 通过id值来查询得到对应的数据库数据
    let article = await Article.findOne({ _id: id });
    // 查询当前文章对应的评论信息
    let comments = await Comment.find({ aid: id });

    // res.send(comments);
    // return
    res.render('home/article', {
        article: article,
        comments: comments
    });
};