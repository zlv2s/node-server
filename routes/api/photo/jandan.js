const express = require('express')
// const http = require('http')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
// const fs = require('fs')
const Iconv = require('iconv-lite')
// const async = require('async')
const decrypt = require('../../../utils/decrypt')

function list(req, res) {
  let page = parseInt(req.params.page)
  let url = `http://jandan.net/ooxx/page-${page}#comments`
  let headers = {
    connection: 'keep-alive',

    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
  }
  request(
    {
      url: url,
      encoding: null,
      headers: headers,
      timeout: 5000
    },
    function (error, response, body) {
      let links = []
      if (response) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        $('.view_img_link').each(function (index, item) {
          links.push(`http://${item['attribs']['href']}`)
        })
        // console.log(links)
        console.log('------------------------success----------------------')
        res.send({
          code: 200,
          data: links,
          msg: ''
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有，点问题'
        })
      }
    }
  )
}
app.get('/:page', function (req, res) {
  if (isNaN(req.params.page)) {
    res.send({
      msg: '请正确填写page参数 int类型',
      code: 2
    })
    return false
  }
  list(req, res)
})
module.exports = app
