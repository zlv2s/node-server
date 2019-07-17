const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
//require('superagent-charset')(superagent);

const fs = require('fs');
const app = express();


app.get('/', (req, res) => {
  const url = 'https://www.zhe800.com/'
  console.log(url);
  superagent.get(url)
    // .charset('gbk')
    //  .set('Accept', 'application/javascript')
    //  .buffer(true)
    .end((err, sres) => {
      if (err) {
        return next(err);
      }
      // console.log(typeof sres.text); // string
      let $ = cheerio.load(sres.text);
      let item = [];
      $('.slider_main .slider_panel').each(function (index, ele) {
        var $ele = $(ele);
        var pic_data = {
          src: $ele.find('img').attr('src_w')
        }
        item.push(pic_data);
      });
      res.send({
        code: 200,
        data: item,
        msg: ''
      });
    });
});

module.exports = app