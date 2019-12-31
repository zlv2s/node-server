const express = require("express");
const app = express();
const Server = require("../../../utils/httpServer");

app.get("/:fnum", function(req, res) {
  let fnum = req.params.fnum;
  let host = "www.flightradar24.com";
  let path = `/v1/search/web/find?query=${fnum}&limit=10`;
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, true)
    .then(function(body) {
      // console.log(body);
      res.send({
        code: 0,
        data: JSON.parse(body).results,
        msg: ""
      });
    })
    .catch(function(err) {
      res.send({
        code: 404,
        msg: "网络好像有点问题"
      });
      console.log(err);
    });
});

module.exports = app;
