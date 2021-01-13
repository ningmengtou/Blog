// 创建数据库集合文件
// 引入mongoose模块
const mongoose = require('mongoose');
// 导入bcrypt模块
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');


// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // unique: true  保证邮箱地址唯一性 不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin   超级管理员
    // normal  普通用户
    role: {
        type: String,
        required: true
    },
    // 0 (启用状态)
    // 1 (禁用状态)
    state: {
        type: Number,
        // default: 0  默认值是0 启用状态
        default: 0
    }
});

// 使用集合规则创建集合
const User = mongoose.model('User', userSchema);

// 对数据文档中的密码加密
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'ningmengtou',
        email: 'zhangsan@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
};


// 创建一条数据
// User.create({
//         username: 'ningmengtou',
//         email: 'ningmengtou@qq.com',
//         password: '123456',
//         role: 'admin',
//         state: 0
//     })
//     .then(() => console.log('数据创建成功'))
//     .catch(() => console.log('数据创建失败'))

// 验证用户信息
const validateUser = user => {
    // 定义对象验证规则
    const schema = {
        username: Joi.string().min(2).max(10).required().error(new Error('用户名属性没有通过验证')),
        email: Joi.string().email().required().error(new Error('邮箱属性没有通过验证')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码属性没有通过验证')),
        // valid('值1', '值2')  限定了属性只能填入的值
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不正确')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值不正确'))
    };
    return Joi.validate(user, schema);
}

// 导出数据集合构造函数
// 可能后面还会导出其他的数据，所有这里使用对象形式
// 属性名是 User 属性值是 User集合构造函数
module.exports = {
    User,
    validateUser
}