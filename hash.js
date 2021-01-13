// 导入bcrypt模块
const bcrypt = require('bcrypt');

async function run() {
    // bcrypt.genSalt()  会生成随机字符串
    // 数值越大 字符串复杂度越高,反之相反 默认是10 
    const salt = await bcrypt.genSalt(10);

    // bcrypt.hash('明文',salt)  对密码进行加密
    // 返回值是加密后的密码
    const pass = await bcrypt.hash('123', salt)
    console.log(salt);
    console.log(pass);
};

run();