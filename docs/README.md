# Node Spider

**Node + Express 爬虫接口**

> 基于 Node 的网络爬虫 API 接口 包括前端开发日报、kugou 音乐、前端 top 框架排行、妹纸福利、搞笑视频、段子笑话、各类视频新闻资讯 热点详情接口数据

**[仓库地址](https://github.com/zlv2s/node-server)**

**[Demo](https://nodespider-api.herokuapp.com/)**

### 环境要求

> 需要安装 node express

### 部署运行

```bash
$ git clone https://github.com/ecitlm/Node-SpliderApi.git

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
    method: "GET",
    encoding: null,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
    }
  };
  //判断是否为https请求
  if (status) {
    http = require("https");
    options.port = 443;
  }

  return new Promise(function(resolve, reject) {
    let body = "";
    let get_req = http.request(options, function(response) {
      //response.setEncoding('utf8');
      response.on("data", function(chunk) {
        body += chunk;
      });

      response.on("end", () => {
        resolve(body);
      });

      response.on("error", err => {
        reject(err);
      });
    });
    get_req.end();
  });
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
  var data = querystring.stringify(data);
  var options = {
    host: host,
    port: "80",
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
      "Content-Length": Buffer.byteLength(data) //返回字符串实际占据的字节长度
    }
  };
  //判断是否为https请求
  if (status) {
    http = require("https");
    options.port = 443;
  }
  return new Promise(function(resolve, reject) {
    let body = "";
    let post_req = http.request(options, function(response) {
      //console.log(response.statusCode);
      response.on("data", function(chunk) {
        body += chunk;
      });

      response.on("end", () => {
        resolve(body);
      });

      response.on("error", err => {
        reject(err);
      });
    });

    post_req.write(data);
    post_req.end();
  });
}
```

### 1.前端开发日报接口

> 前端开发日报列表、单日日报、前端框架 top100

#### 1.1 最新前 10 天日报列表

**必选参数:** `无`

**接口地址:** `api/daily_list`

**调用例子:** `http://localhost:3000/api/daily_list`

#### 1.2 单日日报内容

**必选参数:** 日期 `id`

**接口地址:** `api/daily_info/:id`

**调用例子:** `http://localhost:3000/api/daily_info/20190717`

#### 1.3 前端框架 top 100

> 返回前端 top 100 框架数据

**必选参数:** `无`

**接口地址:** `api/web_frame`

**调用例子:** `http://localhost:3000/api/web_frame`

### 2.笑话段子搞笑图片

> 笑话段子、搞笑图片

#### 2.1 段子列表

> 段子列表、每页返回 20 条数据

**必选参数:** `page` 页数

**接口地址:** `/api/joke_list/:page`

**调用例子:** `http://localhost:3000/api/joke_list/1`

#### 2.2 段子图片

> 每天返回 20 条最新数据

**必选参数:** `无`

**接口地址:** `/api/joke_img/`

**调用例子:** `http://localhost:3000/api/joke_img`

#### 2.3 搞笑图片

> 每页返回 10 条最新数据

**必选参数:** `无`

**接口地址:** `/api/joke_photo/:page`

**调用例子:** `http://localhost:3000/api/joke_photo/1`

### 3. 新闻资讯

> 新闻列表、新闻视频、新闻详情

#### 3.1 新闻列表

> 新闻列表

**必选参数:** `type` 新闻类型

  <table>
  <tr>
	<td>名称</td>
	<td>热点</td>
	<td>社会</td>
	<td>娱乐</td>
	<td>体育</td>
	<td>美文</td>
  <td>科技</td>
  <td>财经</td>
  <td>时尚</td>
</tr>
<tr>
	<td>type</td>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
  <td>5</td>
  <td>6</td>
  <td>7</td>
</tr>

</table>

**接口地址:** `/api/news_list/:type`

**调用例子:** `http://localhost:3000/api/news_list/1`

#### 3.2 新闻详情

> 每页返回 10 条最新数据

**必选参数:** `item_id` 新闻列表的 item id

**接口地址:** `/api/news_detail/:item_id`

**调用例子:** `http://localhost:3000/api/news_detail/6714600693883208206`

#### 3.3 视频数据

**必选参数:** `type` 类型， `page` 分页 如:0/10/20/30

  <table>
<tr>
	<td>type</td>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
    <td>5</td>
    <td>6</td>
</tr>
<tr>
	<td>名称</td>
  <td>搞笑</td>
	<td>美女</td>
	<td>体育</td>
	<td>新闻现场</td>
	<td>涨姿势</td>
	<td>猎奇</td>
  <td>黑科技</td>
</tr>
</table>

**接口地址:** `api/video_list/:type/:page`

**调用例子:** `http://localhost:3000/api/video_list/1/0`

#### 3.4 知乎新闻

**必选参数:** `无`

**接口地址:** `/api/zhihu_news`

**调用例子:** `http://localhost:3000/api/zhihu_news`

#### 3.5 知乎新闻详情

**必选参数:** `news_id`

**接口地址:** `/api/zhihu_news_detail/:news_id`

**调用例子:** `http://localhost:3000/api/zhihu_news_detail/9713459`

### 4.kugou 音乐 wap 端接口

> 音乐新歌榜单、音乐歌单、排行榜、音乐详情、歌词、搜索、歌手信息、详细可看源代码 `api/music`

#### 4.1 音乐新歌榜单

**必选参数:** `无`

**接口地址:** `api/new_songs`

**调用例子:** `http://localhost:3000/api/new_songs`

#### 4.2 音乐歌单

**必选参数:** `无`

**接口地址:** `api/plist/`

**调用例子:** `http://localhost:3000/api/plist/`

#### 4.3 音乐歌单下的音乐列表

**必选参数:** `specialid`

**接口地址:** `api/plist_songs/:specialid`

**调用例子:** `http://localhost:3000/api/plist_songs/125032`

#### 4.4 音乐排行榜

**必选参数:** `无`

**接口地址:** `api/rank_list/`

**调用例子:** `http://localhost:3000/api/rank_list/`

#### 4.5 排行版分类歌曲列表

**必选参数:** `rankid`

**接口地址:** `api/rank_list_info/:rankid`

**调用例子:** `http://localhost:3000/api/rank_list_info/8888`

#### 4.6 歌手分类

**必选参数:** `无`

**接口地址:** `api/singer_classify/`

**调用例子:** `http://localhost:3000/api/singer_classify`

#### 4.7 歌手分类下面的歌手列表

**必选参数:** `classid`

**接口地址:** `api/singer_list/:classid`

**调用例子:** `http://localhost:3000/api/singer_list/88`

#### 4.8 歌手信息

**必选参数:** `singerid` 3060

**接口地址:** `api/singer_info/:singerid`

**调用例子:** `http://localhost:3000/api/singer_info/3060`

#### 4.9 歌曲音乐详情

**必选参数:** `hash` CB7EE97F4CC11C4EA7A1FA4B516A5D97

**接口地址:** `api/song_info/:hash`

**调用例子:** `http://localhost:3000/api/song_info/CB7EE97F4CC11C4EA7A1FA4B516A5D97`

#### 4.10 歌曲音乐歌词

**必选参数:** `hash` CB7EE97F4CC11C4EA7A1FA4B516A5D97

**接口地址:** `api/song_lrc/:hash`

**调用例子:** `http://localhost:3000/api/song_lrc/CB7EE97F4CC11C4EA7A1FA4B516A5D97`

#### 4.11 歌曲音乐搜索

**必选参数:** `keyword`

**接口地址:** `api/music_search/:keyword`

**调用例子:** `http://localhost:3000/api/music_search/谭咏麟`

### 5.lagou 工作搜索

> 获取某个城市的某个工作岗位

#### 5.1 工作搜索

**必选参数:**

`city` : 城市  
`positionName` 职位  
`pageNo` 页码

**接口地址:** `api/job_list/:city/:positionName/:pageNo`

**调用例子:** `http://localhost:3000/api/job_list/深圳/前端开发/1`

#### 5.2 职位详情

**必选参数:** `positionId` : 职位 id

**接口地址:** `api/job_info/:positionId`

**调用例子:** `http://localhost:3000/api/job_info/3844372`

### 6.QQ 音乐

#### 6.1 推荐列表

**必选参数:** `无`

**接口地址:** `api/qq_music/recommend`

**调用例子:** `http://localhost:3000/api/qq_music/recommend`

#### 6.2 歌曲详情

**必选参数：** `songmid`

**接口地址：** `/api/qq_music/song_info/:songmid`

**调用例子：** `http://localhost:3000/api/qq_music/song_info/001G5IgY2gHy1T`

### 7.echo 回声

#### 7.1 歌曲详情

**必选参数：** `id`

**接口地址：** `/api/echo/:id`

**调用例子：** `http://localhost:3000/api/echo/784547`

### 8.FR24

#### 7.1 航班 id

**必选参数：** `航班号`

**接口地址：** `/api/flt/getFltId/:fnum`

**调用例子：** `http://localhost:3000/api/flt/getFltId/ca4115`
