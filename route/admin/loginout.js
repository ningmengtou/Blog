module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function() {
        // res.clearCookie() 方法可以删除cookie   connect.sid 是官方默认的
        res.clearCookie('connect.sid');
        // 重定向到用户登录页面
        res.redirect('/admin/login');
        // 退出登录时，让userInfo为空  清除模板中的用户信息
        req.app.locals.userInfo = null;
    });
};