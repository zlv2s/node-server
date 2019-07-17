
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/', function (req, res) {
  let host = 'c.y.qq.com'
  let path = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1549857248421'
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, true)
    .then(function (body) {
      res.send({
        code: 0,
        data: JSON.parse(body).data,
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
