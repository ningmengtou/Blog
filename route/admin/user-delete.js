const { User } = require('../../model/user');


module.exports = async(req, res) => {
    // 接收到get请求参数的id
    const { id } = req.query;

    // 根据id删除数据库中的文档
    await User.findOneAndDelete({ _id: id });
    // 重定向回到列表页面
    res.redirect('/admin/user');

};