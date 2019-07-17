const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')
// 歌手详细信息
app.get('/:singerid', function (req, res) {
  let singerid = req.params.singerid
  let host = 'm.kugou.com'
  let path = `/singer/info/${singerid}&json=true`
  // false:http请求  true:https请求
  Server.httpMobileGet(host, {}, path, false)
    .then(function (body) {
      body = JSON.parse(body)
      let result = {
        info: body['info'],
        songs: body['songs']
      }
      res.send({
        code: 200,
        data: result,
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
