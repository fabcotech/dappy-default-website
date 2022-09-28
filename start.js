var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

const PORT = 3010;

const app = express();
console.log(__dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
