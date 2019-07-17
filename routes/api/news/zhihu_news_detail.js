const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var host = "news-at.zhihu.com";
    var path = `/api/4/news/${id}`;
    var data = {}
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, true).then(function (body) {
      console.log(id)
      console.log(typeof body)
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