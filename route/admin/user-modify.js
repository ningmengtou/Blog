const bcrypt = require('bcrypt');
const { User } = require('../../model/user');


module.exports = async(req, res, next) => {
    // 接收表单参数(req.body) 和get参数id
    const { username, email, role, state, password } = req.body;
    const { id } = req.query;

    // 根据id在数据库中查看文档
    let user = await User.findOne({ _id: id });
    // 把客户端提交过来的密码和数据库中的密码进行比对
    let isEqual = await bcrypt.compare(password, user.password);

    // 密码对比正确才能进行信息修改，错误就把错误信息提交到错误中间件
    if (isEqual) {
        // 将用户信息更新到数据库中 参数1:被更新的数据 参数2:修改的数据
        // 这里需要修改的数据中不能有密码
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向页面到列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败就把错误信息传递到错误中间件
        // 创建一个对象 属性为 path message id 
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id };
        // next() 传递字符串参数 就可以把错误信息给到错误中间件
        next(JSON.stringify(obj));
    };
};