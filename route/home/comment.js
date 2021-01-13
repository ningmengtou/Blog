// 把评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 接收客户端发来的post请求参数
    const { content, uid, aid } = req.body;

    // 将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        date: new Date()
    });

    // 重定向到文章详情页面
    res.redirect('/home/article/?id=' + aid);
};