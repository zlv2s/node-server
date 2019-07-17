const http = require('http')
function getVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    guid: 8073360576,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return myGet({
    method: 'GET',
    encoding: null,
    hostname: 'c.y.qq.com',
    path: `/base/fcgi-bin/fcg_music_express_mobile3.fcg?Callback=MusicJsonCallback&loginUin=1152921504902638798&g_tk=5381&hostUin=0&format=jsonp&platform=yqq&needNewCode=0&cid=205361747&&uin=0&songmid=${songmid}&filename=C400${songmid}.m4a&guid=8073360576`,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
    }
  })
}

function myGet(options) {
  return new Promise((resolve, reject) => {
    let body = ''
    let getReq = http.request(options, res => {
      res.on('data', chunk => {
        body += chunk
      })
      res.on('end', () => {
        resolve(body)
      })
      res.on('error', err => {
        reject(err)
      })
    })
    getReq.end()
  })
}

// 将当前日期格式化为 YYYYMMDD 形式，并将日期往前推一天
function formatDate(dateObj) {
  return +(`${dateObj.getFullYear()}${padMonth(dateObj.getMonth() + 1)}${dateObj.getDate() - 1}`)
}

function padMonth(num) {
  return (num + '').padStart(2, 0)
}


function randomNum() {
  for (let i = 0; i < 8; i++) {
    num += Math.floor(Math.random() * 10)
  }
}


module.exports = {
  getVkey,
  formatDate,
  randomNum
}