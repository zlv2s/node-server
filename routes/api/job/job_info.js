const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

function list(req, res) {
  let positionId = parseInt(req.params.positionId)
  let url = `https://www.lagou.com/jobs/${positionId}.html`
  let headers = {
    connection: 'keep-alive',
    accept:
      'text/html, application/xhtml+xml, application/xml; q=0.9, image/webp,image/apng, */*;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  }
  request(
    {
      url: url,
      encoding: null,
      headers: headers,
      timeout: 5000
    },
    (error, response, body) => {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        let data = {
          title: $('title').text(),
          publishtime: $('.publish_time').text(),
          job: $('.job-name')
            .find('.name')
            .text(),
          salary: $('.ceil-salary').text(),
          workyear: $('.salary')
            .next('span')
            .next('span')
            .text(),
          education: $('.salary')
            .next('span')
            .next('span')
            .next('span')
            .text(),
          workaddress: $("input[name='workAddress']").val(),
          positionAddress: $("input[name='positionAddress']").val(),
          temptation: $('.job-advantage').text(),
          content: entities.decode(
            $('.job_bt')
              .find('div')
              .html()
          )
        }
        // console.log(data)
        res.send({
          code: 200,
          data: data,
          msg: ''
        })
      } else {
        // console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有，点问题'
        })
      }
    }
  )
}

app.get('/:positionId', function (req, res) {
  list(req, res)
})
module.exports = app
