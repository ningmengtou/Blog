// 引入bcrypt模板
const bcrypt = require('bcrypt');
// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //接收请求参数 再把参数解构操作出来
    const { email, password } = req.body;

    // 服务器端对登录的密码和邮箱进行二次验证
    // 如果用户没有输入邮箱地址或者密码
    if (email.trim().length == 0 || password.trim().length == 0) {
        // 终止代码执行而且返回 400 状态码
        return res.status(400).render('admin/error', { msg: '密码或者邮箱错误' });
    };

    // 根据邮箱地址查询用户信息
    // 因为邮箱地址是唯一的 所有使用findOne 对象属性名和值一致可以只写一个 使用await拿到异步函数的返回值
    let user = await User.findOne({ email });

    // 查询到了用户：user变量的值是对象类型 没有查询到：user变量则是空
    if (user) {
        // 把客户端传递过来的明文密码和数据库中的加密密码进行比对  返回值是布尔值
        let isValue = await bcrypt.compare(password, user.password);

        if (isValue) {
            // 登录成功
            // 将用户名存储在请求对象中 
            // 请求对象使用 req.session 这样才能让对象存储到服务器端的内存中
            req.session.username = user.username;
            // 把用户角色存储到 session 对象中后面利用角色不同来判断权限
            req.session.role = user.role;
            // 这里使用req.app.locals可以设置对象,这样所有模板中都能得到
            req.app.locals.userInfo = user;
            // 对用户的角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 重定向到博客首页
                res.redirect('/home/')
            };
        } else {
            // 没有查询到该用户
            res.status(400).render('admin/error', { msg: '密码或者邮箱错误' });
        }
    } else {
        // 没有查询到该用户
        res.status(400).render('admin/error', { msg: '密码或者邮箱错误' });
    };
};