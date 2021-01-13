// 导入数据构造函数 User 
const { User, validateUser } = require('../../model/user');

const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    // 实施验证
    try {
        await validateUser(req.body);
    } catch (ex) {
        // 验证没有通过
        // ex.message  就是规则中自定义的错误信息
        // 重定向到用户添加页面 
        // 使用模板字符串加上 get请求参数
        // return res.redirect(`/admin/user-edit?message=${ex.message}`);
        // JSON.stringify() 将对象数据转换成字符串数据类型
        // 调用next参数把错误对象传递给错误处理中间件  参数只能是字符串数据类型
        // 这里还是需要return 来阻止代码继续向下执行
        return next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }));
    };

    // 根据邮箱地址查询用户是否存在 存在返回的就是数据对象
    let email = await User.findOne({ email: req.body.email });
    // email 为true 表示邮箱地址已经被占用了
    if (email) {
        // 重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已经被注册过了' }));
    };

    // 对密码进行加密
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 把明文密码替换成加密密码
    req.body.password = password;
    // 把用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到列表页面
    res.redirect('/admin/user');

};