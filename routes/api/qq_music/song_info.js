
const express = require('express')
const superagent = require('superagent');
const util = require('../../../utils/other')
//require('superagent-charset')(superagent);
const app = express()
app.get('/:songmid', (req, res) => {
  let songmid = req.params.songmid
  const url = `https://y.qq.com/n/yqq/song/${songmid}.html`
  superagent.get(url)
    // .charset('gbk')
    //  .set('Accept', 'application/javascript')
    //  .buffer(true)
    .end((err, sres) => {
      if (err) {
        return next(err);
      }
      const text = sres.text
      let reg = /(?<=var g_SongData = ).*?(?=;)/g // 反向肯定预查
      let reg2 = /(?<=MusicJsonCallback\().*?(?=\))/g

      let songInfo = JSON.parse(text.match(reg))
      let songurl = {}
      util.getVkey(songmid).then(vres => {
        const vkey = JSON.parse(vres)['data'].items[0].vkey
        songurl['HQ'] = `http://183.222.96.13/amobile.music.tc.qq.com/M800${songmid}.mp3?guid=8073360576&vkey=${vkey}&uin=3278&fromtag=38`
        songurl['flac'] = `http://183.222.96.13/amobile.music.tc.qq.com/F000${songmid}.flac?guid=8073360576&vkey=${vkey}&uin=3278&fromtag=53`
        songInfo.songurl = songurl
        res.send({
          code: 200,
          data: songInfo,
          msg: ''
        });
      })
    });
});

module.exports = app
