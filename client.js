var fs = require('fs');
var path = require('path');
var request = require('request');
var http = require('http');

var proxy = 'http://127.0.0.1:8000';

var options = {
  uri: 'http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar',
  method: 'GET',
  proxy: proxy,
  followRedirect: true,
  timeout: 10000,
  maxRedirects: 10
};

var filePath = path.resolve('selenium-server.jar');
var file = fs.createWriteStream(filePath);

request(options).on('response', (response) => {
  console.log(response.statusCode);
  if (response.statusCode !== 200) {
    console.error('err');
  }
}).pipe(fs.createWriteStream(filePath));

// attempt with http
// var req = http.request({
//   host: 'localhost',
//   port: '8000',
//   path: '/2.53/selenium-server-standalone-2.53.1.jar',
//   method: 'GET',
//   headers: {
//     host: 'selenium-release.storage.googleapis.com'
//   }
//   // agent: agent
//   // ,
//   // followRedirect: true
// }, (resp) => {
//   console.log(resp);
//   resp.setEncoding('utf8');
//   resp.on('data', (chunk) => {
//     console.log('response: ' + chunk);
//   });
// });
//
// req.end();
