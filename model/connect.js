// 数据库连接文件
// 引入mongoose模板
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败'))