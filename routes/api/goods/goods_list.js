const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:count', function (req, res) {
  let count = req.params.count
  let host = 'm.api.zhe800.com'
  let path = `/list/baoyou/v2?limit=20&offset=${count}`
  // false:http请求  true:https请求
  console.log(host + path)
  Server.httpGet(host, {}, path, true)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body),
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