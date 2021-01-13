const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 添加一个标识  当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 获取到id参数和message参数
    const { id, message } = req.query;

    // 如果获取到了id 就是修改用户  没有获取到就是添加用户
    if (id) {
        // 修改用户操作
        let user = await User.findOne({ _id: id });

        // 渲染用户修改页面 修改的表单提交地址是 '/admin/user-modify'
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
        // 修改页面的模板操作：先判断 user 是否存在 在传递数据

    } else {
        // 添加用户操作
        // 渲染添加用户页面 添加的表单提交地址是 '/admin/user-edit'
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

};