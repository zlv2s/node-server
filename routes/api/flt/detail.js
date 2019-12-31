const express = require("express");
const app = express();
const Server = require("../../../utils/httpServer");

app.get("/:fid", function(req, res) {
  let fid = req.params.fid;
  let host = "data-live.flightradar24.com";
  let path = `/clickhandler/?version=1.5&flight=${fid}`;
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, true)
    .then(function(body) {
      // console.log(body);
      res.send({
        code: 0,
        data: JSON.parse(body),
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
