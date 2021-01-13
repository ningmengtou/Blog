// 创建一个登录拦截函数
const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态
    // 如果用户是登录的 就请求放行
    // 如果用户不是登录的 就请求重定向到登录页面
    // 判断条件代码意思:如果访问的请求地址不是登录页面也没有登录
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 判断用户角色，只有超级管理员才能访问用户列表页面
        // 用户登录但是只是一个普通用户 就跳转到博客页面 阻止程序向下执行
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        };
        next();

    };
};

module.exports = guard;