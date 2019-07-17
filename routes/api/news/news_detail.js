const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:item_id', function (req, res) {
  let itemId = req.params.item_id || '6714600693883208206'
  let host = 'm.toutiao.com'
  let path = `/i${itemId}/info/`
  // false:http请求  true:https请求
  console.log(path)
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body)['data'],
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
