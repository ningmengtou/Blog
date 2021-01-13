// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 引入path模块
const path = require('path');
// 引入第三方模板
const bodyParser = require('body-parser');
// 引入express-session模块
const session = require('express-session');
// 引入art-template模板引擎
const template = require('art-template');
// 引入dateformat模块
const dateFormat = require('dateformat');
// 引入morgan模块
const morgan = require('morgan');
// 引入config模块
const config = require('config');


// 配置body-parser模块 使用use中间件拦截所有请求
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session  设置 saveUninitialized: false 指用户没有登录就不保存cookie
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        // maxAge 属性就是设置cookie的过期时间 单位是毫秒 这里是保存一天
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 导入数据库连接文件
require('./model/connect');

// 开发静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// config.get() 可以获取配置json文件中的配置信息
console.log(config.get('title'));

// process.env  获取系统环境变量  返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 开发环境
    // 在开发环境中 把客户端发送到服务器端的请求信息打印到控制台中
    // app.use(morgan('dev'))   这个写法是固定的
    app.use(morgan('dev'));
} else {
    // 生产环境
    console.log('生产环境');
};

// 模板配置
// 设置模板文件的所在位置  这里路径拼接只到views
app.set('views', path.join(__dirname, 'views'));
// 设置模板文件的默认后缀
app.set('view engine', 'art');
// 设置对应的后缀模板文件使用不同的模板
app.engine('art', require('express-art-template'));
// 向模板内部导入dateformate变量
template.defaults.imports.dateFormat = dateFormat;

// 导入路由对象模块
const admin = require('./route/admin');
const home = require('./route/home');

// 拦截请求,判断用户登录状态  第二个参数直接调用模块中的页面拦截函数
app.use('/admin', require('./middleware/loginGuard'));

// 为路由对象匹配一级请求地址
app.use('/admin', admin);
app.use('/home', home);

// 错误处理中间件  把所有的异步代码错误都集中到一起处理
app.use((err, req, res, next) => {
    // JSON.parse()  可以把字符串数据类型转变为对象类型
    // 变量 result 接收转变为对象类型的err错误对象  err错误对象就是next()传递过来的参数
    const result = JSON.parse(err);
    // 声明一个空数组用于添加循环之后的对象
    let params = [];
    // 对转换后的对象进行遍历
    for (let attr in result) {
        // 对象属性名不是 path 就进行字符串的拼接 并且添加到params数组中
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
            // 拼接结果如： message = 密码比对失败， 不能进行用户信息的修改
        };
    };
    // params.join('&')  是让数组中的对象之间用 & 经行分割拼接
    res.redirect(`${result.path}?${params.join('&')}`);
});


// 监听80端口
app.listen(80);
console.log('服务器启动成功');