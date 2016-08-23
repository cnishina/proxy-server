var httpProxy = require('http-proxy');
var http = require('http');

var seleniumProxy = httpProxy.createProxyServer({
  target: 'https://selenium-release.storage.googleapis.com'
});

var chromeProxy = httpProxy.createProxyServer({
  target: 'https://chromedriver.storage.googleapis.com'
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
});
proxy.listen(8000);
