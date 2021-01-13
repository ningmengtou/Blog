const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 添加一个标识  当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的当前页面参数 如果没有传递参数就是 1
    let page = req.query.page || 1;
    // 每页数据显示条数
    let pagesize = 5;
    // 查询用户数据总数   countDocuments({}) 查询集合中的数据总数
    let count = await User.countDocuments({});
    // 总页数 需要向上取整
    let total = Math.ceil(count / pagesize);

    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find().limit(pagesize).skip(start);
    // 渲染用户列表模板 添加的数据就是上面查询到的所有数据 是列表形式的
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
};