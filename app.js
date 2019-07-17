const express = require('express')
const app = express()
const router = express.Router()
app.use('/public', express.static('public')) // 设置静态资源地址
app.use('/docs', express.static('docs')) // 设置静态资源地址

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

app.use('/', require('./routes/web/index'))

// 酷狗
app.use('/api/new_songs', require('./routes/api/music/new_songs'))
app.use('/api/rank_list', require('./routes/api/music/rank_list'))
app.use('/api/rank_list_info', require('./routes/api/music/rank_list_info'))
app.use('/api/plist', require('./routes/api/music/plist'))
app.use('/api/plist_songs', require('./routes/api/music/plist_songs'))
app.use('/api/singer_classify', require('./routes/api/music/singer_classify'))
app.use('/api/singer_list', require('./routes/api/music/singer_list'))
app.use('/api/singer_info', require('./routes/api/music/singer_info'))
app.use('/api/song_info', require('./routes/api/music/song_info'))
app.use('/api/song_lrc', require('./routes/api/music/song_lrc'))
app.use('/api/music_search', require('./routes/api/music/search'))

// lagou
app.use('/api/job_list', require('./routes/api/job/job_list'))
app.use('/api/job_info', require('./routes/api/job/job_info'))

// 花瓣，煎蛋
app.use('/api/huaban', require('./routes/api/photo/huaban'))
app.use('/api/jandan', require('./routes/api/photo/jandan'))

// joke
app.use('/api/joke_list', require('./routes/api/joke/joke_list'))
app.use('/api/joke_img', require('./routes/api/joke/joke_img'))
app.use('/api/joke_photo', require('./routes/api/joke/joke_photo'))

// news、video
app.use('/api/news_list', require('./routes/api/news/news_list'))
app.use('/api/news_detail', require('./routes/api/news/news_detail'))
app.use('/api/video_list', require('./routes/api/news/video_list'))

// 前端
app.use('/api/web_frame', require('./routes/api/it/web_frame'))
app.use('/api/daily_list', require('./routes/api/it/daily_list'))
app.use('/api/daily_info', require('./routes/api/it/daily_info'))

// zhihu
app.use('/api/zhihu_news', require('./routes/api/news/zhihu_news'));
app.use('/api/zhihu_news_detail', require('./routes/api/news/zhihu_news_detail'));

// qq_music
app.use('/api/qq_music/recommend', require('./routes/api/qq_music/recommend'));
app.use('/api/qq_music/song_info', require('./routes/api/qq_music/song_info'));

// echo
app.use('/api/echo', require('./routes/api/echo/music'));

// web
app.use('/web/daily_list', require('./routes/web/daily_list'))
app.use('/web/daily_info', require('./routes/web/daily_info'))
app.use('/web/photo', require('./routes/web/photo'))
app.use('/web/jandan', require('./routes/web/jandan'))


app.use(router)
app.listen(3000)
console.log('app start success at http://127.0.0.1:3000')
module.exports = app
