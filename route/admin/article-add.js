// 引入formidable模块
const formidable = require('formidable');
const path = require('path');

// 导入数据集合Article
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 1.创建一个表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置  使用绝对路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀  true(保留)  false(不保留)
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        // 1.err是错误对象 解析失败err就是错误信息 解析成功err就是null 空
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存上传文件相关的数据

        // 对图片路径进行截取，取public之后的路径  files.cover.path.split('public')[1]
        // 把参数存储在数据库中 每个字段需要单独添加数据
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 重定向到文章列表页面
        res.redirect('/admin/article');
    });

};