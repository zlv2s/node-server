const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:city/:positionName/:pageNo', function (req, res) {
  let city = encodeURIComponent(req.params.city)
  let positionName = encodeURIComponent(req.params.positionName)
  let pageNo = req.params.pageNo
  let host = 'm.lagou.com'
  let path = `/search.json?city=${city}&positionName=${positionName}&pageNo=${pageNo}&pageSize=15`
  let data = {}
  console.log(path)
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, true)
    .then(body => {
      let list = JSON.parse(body)
      console.log(list)
      res.send({
        code: 200,
        data: list,
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
