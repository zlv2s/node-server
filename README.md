# Node Spider

> 在[原作者](https://github.com/ecitlm/Node-SpliderApi)基础上修改，所有接口都测试正常返回数据

**Node + Express 爬虫接口**

> 基于 Node 的网络爬虫 API 接口 包括前端开发日报、kugou 音乐、前端 top 框架排行、搞笑视频、段子笑话、新闻资讯、热点详情接口数据



**[仓库地址](https://github.com/zlv2s/node-server)**   

**[Demo](https://nodespider-api.herokuapp.com/)**

***

### 环境要求

> 需要安装 node express

### 部署运行

```bash
$ git clone git@github.com:zlv2s/node-server.git

$ npm install

$ node app.js
```

服务器启动默认端口为 3000 、启动之后就可以开启了接口服务了.

浏览器打开`http://localhost:3000/docs` 可以查看所有接口文档


**接口文件**

```txt
├── api
│   ├── echo
│   │   └── music.js
│   ├── goods
│   │   ├── goods_list.js
│   │   ├── lunbo_pic.js
│   │   └── main_lunbo.js
│   ├── it
│   │   ├── daily_info.js
│   │   ├── daily_list.js
│   │   └── web_frame.js
│   ├── job
│   │   ├── job_info.js
│   │   └── job_list.js
│   ├── joke
│   │   ├── joke_img.js
│   │   ├── joke_list.js
│   │   └── joke_photo.js
│   ├── music
│   │   ├── new_songs.js
│   │   ├── plist.js
│   │   ├── plist_songs.js
│   │   ├── rank_list.js
│   │   ├── rank_list_info.js
│   │   ├── search.js
│   │   ├── singer_classify.js
│   │   ├── singer_info.js
│   │   ├── singer_list.js
│   │   ├── song_info.js
│   │   └── song_lrc.js
│   ├── news
│   │   ├── news_detail.js
│   │   ├── news_list.js
│   │   ├── video_list.js
│   │   ├── zhihu_news.js
│   │   └── zhihu_news_detail.js
│   ├── photo
│   │   ├── huaban.js
│   │   ├── huaban_data.json
│   │   └── jandan.js
│   └── qq_music
│       ├── recommend.js
│       └── song_info.js
└── web
    ├── daily_info.js
    ├── daily_list.js
    ├── index.js
    ├── jandan.js
    └── photo.js

```

**网络请求封装 `httpServer.js`**

`get`方法

```javascript
/**
 * http get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpGet(host, data, path, status) {
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
    }
  }
  //判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }

  return new Promise(function(resolve, reject) {
    let body = ''
    let get_req = http.request(options, function(response) {
      //response.setEncoding('utf8');
      response.on('data', function(chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })
    get_req.end()
  })
}
```

`POST`方法

```javascript
/**
 * http POST 请求
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpPost(host, data, path, status) {
  var data = querystring.stringify(data)
  var options = {
    host: host,
    port: '80',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
      'Content-Length': Buffer.byteLength(data) //返回字符串实际占据的字节长度
    }
  }
  //判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }
  return new Promise(function(resolve, reject) {
    let body = ''
    let post_req = http.request(options, function(response) {
      //console.log(response.statusCode);
      response.on('data', function(chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })

    post_req.write(data)
    post_req.end()
  })
}
```

### 接口文档

[文档地址](https://nodespider-api.herokuapp.com/docs)
