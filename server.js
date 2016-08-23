var httpProxy = require('http-proxy');
var http = require('http');
//var proxy = httpProxy.createProxyServer((req, res) => {
//  console.log(req);
//  return { target: 'https://selenium-release.storage.googleapis.com' };
//});
//
//
var seleniumProxy = httpProxy.createProxyServer({
  target: 'https://selenium-release.storage.googleapis.com'
});

var chromeProxy = httpProxy.createProxyServer({
  target: 'https://chromedriver.storage.googleapis.com'
});

var googleProxy = httpProxy.createProxyServer({
  target: 'https://google.com'
});

var proxy = http.createServer(function(req, res) {
  var header = req.headers['host'];
  if (header.startsWith('selenium')) {
    console.log(header);
    seleniumProxy.web(req,res);
  }
  else if (header.startsWith('chromedriver')) {
    console.log(header);
    chromeProxy.web(req,res);
  }
  else {
    googleProxy.web(req,res);
  }
});
proxy.listen(8000);
