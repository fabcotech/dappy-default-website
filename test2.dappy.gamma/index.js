const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/test2.js', (req, res) => {
  res.setHeader('Content-Type', "text/javascript");
  res.send(fs.readFileSync(__dirname + '/test2.js', 'utf8'))
});
app.get('/test2.png', (req, res) => {
  res.setHeader('Content-Type', "image/png");
  res.send(fs.readFileSync(__dirname + '/test2.png'))
});
app.get('*', (req, res) => {
  res.send('<html>test2</html>')
});

const serverHttp = http.createServer({}, app);

serverHttp.listen(3006)
console.log("(test2.dappy.gamma) listenning on 127.0.0.1:3006")