// 1.引入mongoose模块
const mongoose = require('mongoose');

// 2.创建文章集合规则
const aticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题'],
        minlength: 2,
        maxlength: 20
    },
    author: {
        // 文章规则和用户规则相关联  用户名就是作者
        type: mongoose.Schema.Types.ObjectId,
        require: [true, '请填写作者名称'],
        ref: 'User'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

// 3.根据规则创建集合
const Article = mongoose.model('Article', aticleSchema);

// 4.把集合规则作为模块成员进行导入
module.exports = {
    Article
}