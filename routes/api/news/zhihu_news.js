const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/', function (req, res) {
    var host = "news-at.zhihu.com";
    var path = `/api/4/news/latest`;
    var data = {}
    //false:http请求  true:https请求
    console.log(path)
    Server.httpGet(host, data, path, true).then(function (body) {
        res.send({
            msg: "success",
            code: 1,
            data: JSON.parse(body)
        })

    }).catch(function (err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;