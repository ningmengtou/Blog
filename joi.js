const Joi = require('joi');

// 定义对象验证规则
const schema = {
    username: Joi.string().min(2).max(10).required().error(new Error('username属性没有通过验证')),
    // email: Joi.string().email().required(),
    // password: Joi.string().required(),
    // role: Joi.string().required(),
    // state: Joi.number().required()
};

// 实施验证
async function run() {
    try {
        await Joi.validate({ username: '张三' }, schema);
    } catch (ex) {
        console.log(ex.message);
    };

    console.log('验证通过');
};

run();