let express = require('express')
let app = express()
let ejs = require('ejs')

// 这里也可以配置识别HTML
app.engine('ejs', ejs.__express) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径
const { formatDate } = require('../../utils/other')
app.locals.formatDate = formatDate //加载自定义全局方法，可在ejs模板中使用

app.get('/', function (req, res) {
  // res.header("Content-Type:text/html; charset=utf-8");
  res.render('index', {
    title: 'Nodejs + express'
  })
})

module.exports = app
