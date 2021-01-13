const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // 文章id 评论和文章集合相关联
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id 评论和用户集合相关联
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,

    },
    date: {
        type: Date,

    }

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}