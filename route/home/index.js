// 引入分页模块
const pagination = require('mongoose-sex-page');

const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 接收get请求参数的 page 
    const { page } = req.query;

    // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(3).find().exec();


    // 渲染模板并传递数据
    res.render('home/default', {
        result: result
    });
}