
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')
const fs = require('fs')
// const async = require('async')
// const fs = require('fs')
// const request = require('request')

function MathRand() {
  let num = ''
  for (let i = 0; i < 8; i++) {
    num += Math.floor(Math.random() * 10)
  }
  return num
}

app.get('/', function (req, res) {
  let host = 'huaban.com'
  let random = MathRand()
  // https://huaban.com/boards/26262430/?jy6vcm9q&max=2391333766&limit=20&wfl=1
  let path = `/explore/aodaili-heben/?jy75ev8r&max=328252182&limit=20&wfl=1`
  let data = {}

  // false:http请求  true:https请求
  console.log(host + path)
  Server.ajaxGet(host, data, path, true)
    .then(body => {
      // fs.writeFile('./routes/api/photo/huaban_data.json', body, function (err) {
      //     if (err) {
      //       throw err
      //     }
      //     console.log('写入成功');
      //   })

      let list = JSON.parse(body)['pins']
      let arr = []
      for (let i in list) {
        arr.push({
          url: list[i]['link'],
          title: list[i]['raw_text'],
          desc: list[i]['raw_text'],
          like: list[i]['like_count']
        })
      }
      res.send({
        code: 200,
        data: arr,
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
