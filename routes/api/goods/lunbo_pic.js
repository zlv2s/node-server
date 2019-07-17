const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:id', function (req, res) {
  let id = req.params.id
  let host = 'm.zhe800.com'
 // https://m.zhe800.com/gateway/app/detail/graph?productId=ze180704210025680054
  let path = `/gateway/app/detail/graph?productId=${id}`
  // false:http请求  true:https请求
  console.log(host + path)
  Server.httpGet(host, {}, path, true)
    .then(function (body) {
   	 //console.log(body)
   	 var reg = /\\/g;
   	 var reg2 = /"{/g;
     var reg3 = /}"/g;
   	 var reg4 = /\/app\/detail\/graph\//g;
    // var reg5 = /small/g;
   	 var str = body.replace(reg, '');
   	 str = str.replace(reg2, '{');
   	 str = str.replace(reg3, '}');
   	 str = str.replace(reg4, '');
     //str = str.replace(reg5, 'img');
      res.send({
        code: 200,
        data: JSON.parse(str),
        msg: ''
      })
    })
    .catch(function (err) {
      res.send({
        code: 404,
        msg: '网络好像有点问题'
      })
      console.log(err)
    })
})
module.exports = app