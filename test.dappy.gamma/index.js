const http = require('http');
const express = require('express');
const fs = require('fs');
const { blake2b } = require('blakejs');

const elliptic = require('elliptic');

const app = express();

app.get('/test.png', (req, res) => {
  res.setHeader('Content-Type', "image/png");
  res.send(fs.readFileSync(__dirname + '/test.png'))
});

let challenges = {};
let sessions = {};

app.post('/blitz-authenticate', (req, res) => {
  try {
    const payload = JSON.parse(req.headers['blitz-authentication-response']);
    if (payload.nonce && challenges[payload.nonce]) {
      const e = new elliptic.ec("secp256k1");
      const bufferToSign = Buffer.from(JSON.stringify(challenges[payload.nonce].challenge), "utf8");
      const uInt8Array = new Uint8Array(bufferToSign);
      const blake2bHash = blake2b(uInt8Array, 0, 32);
  
      const keyPair = e.keyFromPublic(payload.publicKey, 'hex');
      if (e.verify(Buffer.from(blake2bHash), payload.signature, keyPair, "hex")) {
        res.setHeader('set-cookie', `session=${payload.nonce}; Max-Age=10000; SameSite=Lax; HttpOnly; Secure;`);
        sessions[payload.nonce] = 'ok';
        console.log('connected !');
        res.redirect("https://test.dappy.gamma/connected");
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.sendStatus(403);
  }
});

app.get('/connected', (req, res) => {
  res.send('<html>connected</html>')
});

app.get('/download', (req, res) => {
  console.log(__dirname);
  const file = `${__dirname}/mountain.jpg`;
  res.download(file);
});

app.get('/login', (req, res) => {
  const nonce = "" + (Math.random() * 1000000 * new Date().getTime());
  res.setHeader('Blitz-Authentication', JSON.stringify({
    "version": 1,
    "host": "test.dappy.gamma",
    "nonce": nonce
  }));

  challenges[nonce] = {
    date: new Date().toISOString(),
    challenge: {
      "version": 1,
      "host": "test.dappy.gamma",
      "nonce": nonce
    }
  };

  setTimeout(() => {
    res.send('<html>login</html>')
  }, 6000);

});

app.get('*', (req, res) => {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'))
});

const options = {};
const serverHttp = http.createServer(options, app);

serverHttp.listen(3005)
console.log("(test.dappy.gamma) listenning on 127.0.0.1:3005")