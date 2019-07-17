
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:id', function (req, res) {
  let id = req.params.id
  let host = 'www.app-echo.com'
  let path = `/sound/api-infos?ids=${id}`
  console.log(host + path);
  // false:http请求  true:https请求
  Server.httpMobileGet(host, {}, path, false)
    .then(body => {
      res.send({
        code: 0,
        data: JSON.parse(body)['desc'],
        msg: ''
      })
    })
    .catch(err => {
      res.send({
        code: 404,
        msg: '网络好像有点问题'
      })
      console.log(err)
    })
})

module.exports = app
