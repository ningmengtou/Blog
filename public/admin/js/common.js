// 创建一个表单提交的验证函数，用于获取表单的属性和值
function serializeToJson(form) {
    var result = {};
    // serializeArray() 可以获取数组形式的表单属性和值 如 [{name:'email',value:'410205@qq.com'}]
    var f = form.serializeArray();
    // 遍历数组 把数组中的对象放置在空对象 result中
    f.forEach(function(item) {
        result[item.name] = item.value;
    });
    // 返回值  result 
    return result;
};